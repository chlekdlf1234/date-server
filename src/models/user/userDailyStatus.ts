import { IUserDailyStatusModel } from '../../types/model';
import { IsValidKey } from '../../types/helper';

export default (isValidKey: IsValidKey) => ({
  PK,
  SK,
  createdAt = new Date().toISOString(),
  updatedAt = new Date().toISOString(),
  status = 'wait',
  statusStartTime = new Date().toISOString(),
  dailyStudySeconds = 0,
  userId,
}: IUserDailyStatusModel) => {
  if (!isValidKey({ model: 'userDailyStatus', key: { PK, SK } })) {
    throw new Error('Data must have a valid prefix.');
  }

  if (!userId) {
    throw new Error('User daily status must have a user id');
  }

  return Object.freeze({
    getPK: () => PK,
    getSK: () => SK,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
    getStatus: () => status,
    getStatusStartTime: () => statusStartTime,
    getDailyStudySecond: () => dailyStudySeconds,
    getUserId: () => userId,
  });
};
