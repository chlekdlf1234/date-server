import { IUserDailyStatusModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';
import { IPeriodParam } from '../../types/common';

import dynamoDB from '../../helper/dynamodb';

export default (addPrefix: AddPrefix) => async ({ email, period }: IPeriodParam): Promise<IUserDailyStatusModel> => {
  try {
    const key = addPrefix({
      model: 'userStatus',
      key: {
        PK: email,
        SK: period,
      },
    });

    const userStatus = (
      await dynamoDB.query({
        TableName: process.env.TABLENAME!,
        KeyConditionExpression: 'PK = :PK and SK = :SK',
        ExpressionAttributeValues: {
          ':PK': key.PK,
          ':SK': key.SK,
        },
      })
    ).Items![0] as IUserDailyStatusModel;

    return userStatus;
  } catch (error) {
    throw new Error(`get user daily status/${error}`);
  }
};
