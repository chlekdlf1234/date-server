import { v4 as createId } from 'uuid';

import { ILinkInvitationModel } from '../../types/model';
import { IInvitationParam } from '../../types/common';
import { AddPrefix } from '../../types/helper';

import dynamoDB from '../../helper/dynamodb';
import { makeInvitation } from '../../models/index';

import getUser from '../user/getUser';

// eslint-disable-next-line
export default (addPrefix: AddPrefix) => async ({
  hostEmail,
  guestEmail,
}: IInvitationParam): Promise<ILinkInvitationModel> => {
  try {
    const putItem = async (PK: string, SK: string, link: string, isInvited: boolean) => {
      const key = addPrefix({
        model: 'linkInvitation',
        key: {
          PK,
          SK,
          GSI1PK: PK,
          GSI2PK: link,
        },
      });

      const isExist = (
        await dynamoDB.query({
          TableName: process.env.TABLENAME!,
          KeyConditionExpression: 'PK = :PK',
          ExpressionAttributeValues: {
            ':PK': key.PK,
          },
        })
      ).Items![0] as ILinkInvitationModel;

      if (isExist) {
        throw new Error('Invitation is already exist');
      }

      const invitation = makeInvitation({ ...key, hostEmail, guestEmail, linkID: link, isInvited } as ILinkInvitationModel);

      const invitationItem = {
        PK: invitation.getPK(),
        SK: invitation.getSK(),
        GSI1PK: invitation.getGSI1PK(),
        GSI1SK: invitation.getGSI1SK(),
        GSI2PK: invitation.getGSI2PK(),
        isInvited: invitation.getIsInvited(),
        hostEmail: invitation.getHostEmail(),
        guestEmail: invitation.getGuestEmail(),
        linkID: invitation.getLinkID(),
        createdAt: invitation.getCreatedAt(),
        updatedAt: invitation.getUpdatedAt(),
      };

      await dynamoDB.put({
        TableName: process.env.TABLENAME!,
        Item: invitationItem,
        ConditionExpression: 'attribute_not_exists(#PK)',
        ExpressionAttributeNames: {
          '#PK': 'PK',
        },
      });

      return invitationItem;
    };

    const linkID = createId();

    const guestUser = await getUser(addPrefix)({ email: guestEmail });

    if (!guestUser) {
      throw new Error('Guest does not exist');
    }

    if (hostEmail === guestEmail) {
      throw new Error('Guest and Host can not be equal');
    }

    const hostInvitationItem = await putItem(hostEmail, guestEmail, linkID, false);

    await putItem(guestEmail, hostEmail, linkID, true);

    return hostInvitationItem;
  } catch (error) {
    console.log(error);
    throw new Error(`add invitation/${error}`);
  }
};
