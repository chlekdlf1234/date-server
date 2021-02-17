import { ILinkedUserModel, ILinkInvitationModel, IUserModel } from '../../types/model';
import { ILinkIDParam } from '../../types/common';
import { AddPrefix } from '../../types/helper';

import dynamoDB from '../../helper/dynamodb';
import { makeLinkedUser } from '../../models/index';
import getUser from '../user/getUser';

// eslint-disable-next-line
export default (addPrefix: AddPrefix) => async ({
  linkID,
  email,
}: ILinkIDParam): Promise<ILinkedUserModel> => {
  try {
    const putItem = async (PK: string, SK: string, link: string, user: IUserModel, linkedUser: IUserModel) => {
      const key = addPrefix({
        model: 'linkedUser',
        key: {
          PK,
          SK,
          GSI1PK: PK,
          GSI2PK: link,
        },
      });

      const linkUserModel = makeLinkedUser({
        ...key,
        name: linkedUser.name,
        birthday: linkedUser.birthday,
        linkID,
        email: user.email,
        linkedUserEmail: linkedUser.email,
      } as ILinkedUserModel);

      const linkUserObject = {
        PK: linkUserModel.getPK(),
        SK: linkUserModel.getSK(),
        GSI1PK: linkUserModel.getGSI1PK(),
        GSI1SK: linkUserModel.getGSI1SK(),
        GSI2PK: linkUserModel.getGSI2PK(),
        linkedUserEmail: linkUserModel.getLinkedUserEmail(),
        email: linkUserModel.getEmail(),
        name: linkUserModel.getName(),
        birthday: linkUserModel.getBirthday(),
        linkID: linkUserModel.getLinkID(),
        createdAt: linkUserModel.getCreatedAt(),
        updatedAt: linkUserModel.getUpdatedAt(),
      };

      await dynamoDB.put({
        TableName: process.env.TABLENAME!,
        Item: linkUserObject,
        ConditionExpression: 'attribute_not_exists(#SK)',
        ExpressionAttributeNames: {
          '#SK': 'SK',
        },
      });

      return linkUserObject;
    };

    // invitation item 검색
    const invitationKey = addPrefix({
      model: 'linkInvitation2',
      key: {
        GSI2PK: linkID,
      },
    });

    const invitationItems = (
      await dynamoDB.query({
        TableName: process.env.TABLENAME!,
        IndexName: process.env.GSI2INDEX,
        KeyConditionExpression: 'GSI2PK = :GSI2PK',
        ExpressionAttributeValues: {
          ':GSI2PK': invitationKey.GSI2PK,
        },
      })
    ).Items! as ILinkInvitationModel[];

    if (invitationItems.length / 2 !== 1) {
      throw new Error('Invitation does not exist');
    }

    const guestInvitation = invitationItems.filter((item) => item.isInvited === true)[0];

    if (guestInvitation.guestEmail !== email) {
      throw new Error('Only guest can confirm invitation');
    }

    const invitation = invitationItems[0];

    const hostUserItem = await getUser(addPrefix)({ email: invitation.hostEmail });
    const guestUserItem = await getUser(addPrefix)({ email: invitation.guestEmail });

    const guestLinkedUserItem = await putItem(invitation.guestEmail, invitation.hostEmail, linkID, guestUserItem, hostUserItem);
    await putItem(invitation.hostEmail, invitation.guestEmail, linkID, hostUserItem, guestUserItem);

    return guestLinkedUserItem;
  } catch (error) {
    console.log(error);
    throw new Error(`confirm invitation/${error}`);
  }
};
