import { IUserModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';

import dynamoDB from '../../helper/db/dynamodb';

interface IParam {
  userId: string;
}

export default (addPrefix: AddPrefix) => async ({ userId }: IParam): Promise<IUserModel> => {
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
    throw new Error(`add user/${error}`);
  }
};
