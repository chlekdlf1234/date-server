import { IAuthModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';
import { IEmailParam } from '../../types/common';

import dynamoDB from '../../helper/dynamodb';

export default (addPrefix: AddPrefix) => async ({ email }: IEmailParam): Promise<IAuthModel> => {
  try {
    const key = addPrefix({
      model: 'auth',
      key: {
        PK: email,
      },
    });

    const authUser = (
      await dynamoDB.query({
        TableName: process.env.AUTH_TABLENAME!,
        KeyConditionExpression: 'PK = :PK',
        ExpressionAttributeValues: {
          ':PK': key.PK,
        },
      })
    ).Items![0] as IAuthModel;

    return authUser;
  } catch (error) {
    throw new Error(`get user auth information/${error}`);
  }
};
