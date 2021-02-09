import { IUserDailyStatusAttr, IUserDailyStatusModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';

import dynamoDB from '../../helper/dynamodb';
import { makeUserDailyStatus } from '../../models/index';

export default (addPrefix: AddPrefix) => async ({ email, status, dailyStudySeconds, statusStartTime, period = 'day' }: IUserDailyStatusAttr): Promise<IUserDailyStatusModel> => {
  try {
    const key = addPrefix({
      model: 'userDailyStatus',
      key: {
        PK: email,
        SK: period,
      },
    });

    const userDailyStatus = makeUserDailyStatus({
      ...key,
      email,
      status,
      dailyStudySeconds,
      statusStartTime,
      period,
    });

    const userDailyStatusItem = {
      PK: userDailyStatus.getPK(),
      SK: userDailyStatus.getSK(),
      email: userDailyStatus.getEmail(),
      status: userDailyStatus.getStatus(),
      dailyStudySeconds: userDailyStatus.getDailyStudySecond(),
      statusStartTime: userDailyStatus.getStatusStartTime(),
      period: userDailyStatus.getPeriod(),
      createdAt: userDailyStatus.getCreatedAt(),
      updatedAt: userDailyStatus.getUpdatedAt(),
    };

    await dynamoDB.put({
      TableName: process.env.TABLENAME!,
      Item: userDailyStatusItem,
      ConditionExpression: 'attribute_not_exists(#PK)',
      ExpressionAttributeNames: {
        '#PK': 'PK',
      },
    });

    return userDailyStatusItem;
  } catch (error) {
    throw new Error(`add user daily status/${error}`);
  }
};
