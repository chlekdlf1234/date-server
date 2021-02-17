import { ILinkInvitationModel } from '../../types/model';
import { IsValidKey } from '../../types/helper';

// eslint-disable-next-line
export default (isValidKey: IsValidKey) => ({
  PK,
  SK,
  GSI1PK,
  GSI1SK,
  GSI2PK,
  createdAt = new Date().toISOString(),
  updatedAt = new Date().toISOString(),
  hostEmail,
  guestEmail,
  isInvited,
  linkID,
}: ILinkInvitationModel) => {
  if (!isValidKey({ model: 'linkInvitation', key: { PK, SK, GSI1SK, GSI1PK, GSI2PK } })) {
    throw new Error('Data must have a valid prefix.');
  }

  if (!linkID) {
    throw new Error('Invitation must have a link id.');
  }

  if (typeof isInvited === 'undefined') {
    throw new Error('Invitation must have a invite information');
  }

  if (!hostEmail) {
    throw new Error('Invitation must have a host email');
  }

  if (!guestEmail) {
    throw new Error('Invitation must have a guest email');
  }

  return Object.freeze({
    getPK: () => PK,
    getSK: () => SK,
    getGSI1PK: () => GSI1PK,
    getGSI1SK: () => GSI1SK,
    getGSI2PK: () => GSI2PK,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
    getIsInvited: () => isInvited,
    getHostEmail: () => hostEmail,
    getGuestEmail: () => guestEmail,
    getLinkID: () => linkID,
  });
};
