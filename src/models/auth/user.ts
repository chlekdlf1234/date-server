import bcrypt from 'bcrypt';
import { IAuthModel } from '../../types/model';
import { IsValidKey } from '../../types/helper';

export default (isValidKey: IsValidKey) => async ({ PK, createdAt = new Date().toISOString(), updatedAt = new Date().toISOString(), password, email }: IAuthModel) => {
  if (!isValidKey({ model: 'auth', key: { PK } })) {
    throw new Error('Data must have a valid prefix.');
  }

  if (!password) {
    throw new Error('must have a password.');
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  return Object.freeze({
    getPK: () => PK,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
    getPassword: () => hashedPassword,
    getEmail: () => email,
  });
};
