import { ILinkInvitationModel, ILinkedUserModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';
import { IEmailParam } from '../../types/common';

import dynamoDB from '../../helper/dynamodb';

type InvitationInformation = ILinkInvitationModel | ILinkedUserModel;

interface IReturn {
  status: string;
  linkInformation: InvitationInformation | undefined;
}

export default (addPrefix: AddPrefix) => async ({ email }: IEmailParam): Promise<IReturn> => {
  try {
    const key = addPrefix({
      model: 'linkInvitation1',
      key: {
        GSI1PK: email,
      },
    });

    const linkInformation = (
      await dynamoDB.query({
        TableName: process.env.TABLENAME!,
        IndexName: process.env.GSI1INDEX,
        KeyConditionExpression: 'GSI1PK = :GSI1PK and GSI1SK = :GSI1SK',
        ExpressionAttributeValues: {
          ':GSI1PK': key.GSI1PK,
          ':GSI1SK': key.GSI1SK,
        },
      })
    ).Items! as InvitationInformation[];

    let status;
    let returnValue;

    if (linkInformation.length === 0) {
      status = 'initial';
      return { status, linkInformation: returnValue };
    }

    const linkedUser = linkInformation.filter((item) => item.SK?.includes('LINK'))[0];
    const invitation = linkInformation.filter((item) => item.SK?.includes('INVITATION'))[0];

    if (linkedUser) {
      status = 'linked';
      returnValue = linkedUser;
    } else {
      if ((invitation as ILinkInvitationModel).isInvited) {
        status = 'guest';
      } else {
        status = 'host';
      }

      returnValue = invitation;
    }

    return { status, linkInformation: returnValue };
  } catch (error) {
    console.log(error);
    throw new Error(`get link information/${error}`);
  }
};
