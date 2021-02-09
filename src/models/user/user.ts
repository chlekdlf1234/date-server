import { IUserModel } from '../../types/model';
import { IsValidKey } from '../../types/helper';

export default (isValidKey: IsValidKey) => ({ PK, SK = 'INFORMATION', GSI1PK, GSI1SK, createdAt = new Date().toISOString(), updatedAt = new Date().toISOString(), name, birthday, job, email }: IUserModel) => {
  if (!isValidKey({ model: 'user', key: { PK, SK, GSI1PK, GSI1SK } })) {
    throw new Error('Data must have a valid prefix.');
  }

  if (!email) {
    throw new Error('User must have a cognito id.');
  }

  if (!birthday) {
    throw new Error('User must have a birthday');
  }

  if (!name) {
    throw new Error('User must have a name');
  }

  return Object.freeze({
    getPK: () => PK,
    getSK: () => SK,
    getGSI1PK: () => GSI1PK,
    getGSI1SK: () => GSI1SK,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
    getName: () => name,
    getBirthday: () => birthday,
    getJob: () => job,
    getEmail: () => email,
  });
};
