import { IUserModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';
import { IEmailParam } from '../../types/common';

import dynamoDB from '../../helper/dynamodb';

export default (addPrefix: AddPrefix) => async ({ email }: IEmailParam): Promise<IUserModel> => {
  try {
    const key = addPrefix({
      model: 'userInformation',
      key: {
        PK: email,
      },
    });

    const user = (
      await dynamoDB.query({
        TableName: process.env.TABLENAME!,
        KeyConditionExpression: 'PK = :PK and SK = :SK',
        ExpressionAttributeValues: {
          ':PK': key.PK,
          ':SK': key.SK,
        },
      })
    ).Items![0] as IUserModel;

    return user;
  } catch (error) {
    throw new Error(`get user/${error}`);
  }
};
