import { ILinkedUserModel } from '../../types/model';
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
  linkedUserEmail,
  email,
  name,
  birthday,
  linkID,
}: ILinkedUserModel) => {
  if (!isValidKey({ model: 'linkedUser', key: { PK, SK, GSI1PK, GSI1SK, GSI2PK } })) {
    throw new Error('Data must have a valid prefix.');
  }

  if (!linkID) {
    throw new Error('Invitation must have a link id.');
  }

  if (!linkedUserEmail) {
    throw new Error('Link must have a linked user"s email');
  }

  if (!email) {
    throw new Error('Link must have a user"s email');
  }

  if (!name) {
    throw new Error('Link must have a linked user"s name');
  }

  if (!birthday) {
    throw new Error('Link must have a linked user"s birthday');
  }

  return Object.freeze({
    getPK: () => PK,
    getSK: () => SK,
    getGSI1PK: () => GSI1PK,
    getGSI1SK: () => GSI1SK,
    getGSI2PK: () => GSI2PK,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
    getEmail: () => email,
    getLinkedUserEmail: () => linkedUserEmail,
    getName: () => name,
    getBirthday: () => birthday,
    getLinkID: () => linkID,
  });
};
