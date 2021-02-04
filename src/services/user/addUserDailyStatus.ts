import { IUserDailyStatusAttr, IUserDailyStatusModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';

import dynamoDB from '../../helper/db/dynamodb';
import { makeUserDailyStatus } from '../../models/index';

export default (addPrefix: AddPrefix) => async ({ userId, status, dailyStudySeconds, statusStartTime }: IUserDailyStatusAttr): Promise<IUserDailyStatusModel> => {
  try {
    const key = addPrefix({
      model: 'userDailyStatus',
      key: {
        PK: userId,
      },
    });

    const userDailyStatus = makeUserDailyStatus({ ...key, userId, status, dailyStudySeconds, statusStartTime });

    const userDailyStatusItem = {
      PK: userDailyStatus.getPK(),
      SK: userDailyStatus.getSK(),
      userId: userDailyStatus.getUserId(),
      status: userDailyStatus.getStatus(),
      dailyStudySeconds: userDailyStatus.getDailyStudySecond(),
      statusStartTime: userDailyStatus.getStatusStartTime(),
      createdAt: userDailyStatus.getCreatedAt(),
      updatedAt: userDailyStatus.getUpdatedAt(),
    };

    await dynamoDB.put({
      TableName: process.env.TABLENAME!,
      Item: userDailyStatusItem,
    });

    return userDailyStatusItem;
  } catch (error) {
    throw new Error(`add user daily status/${error}`);
  }
};