import { IUserModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';
import { IUserIdParam } from '../../types/common';

import dynamoDB from '../../helper/db/dynamodb';

export default (addPrefix: AddPrefix) => async ({ userId }: IUserIdParam): Promise<IUserModel> => {
  try {
    const key = addPrefix({
      model: 'userInformation',
      key: {
        PK: userId,
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

    console.log(user);
    return user;
  } catch (error) {
    throw new Error(`get user/${error}`);
  }
};
