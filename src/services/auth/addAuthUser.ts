import { IAuthAttr, IAuthModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';

import dynamoDB from '../../helper/dynamodb';
import { makeAuth } from '../../models/index';

// eslint-disable-next-line
export default (addPrefix: AddPrefix) => async ({
  email,
  password,
}: IAuthAttr): Promise<IAuthModel> => {
  try {
    const key = addPrefix({
      model: 'auth',
      key: {
        PK: email,
      },
    });

    const authItem = await makeAuth({ ...key, email, password });

    const authUserItem = {
      PK: authItem.getPK(),
      password: authItem.getPassword(),
      email: authItem.getEmail(),
      createdAt: authItem.getCreatedAt(),
      updatedAt: authItem.getUpdatedAt(),
    };

    await dynamoDB.put({
      TableName: process.env.AUTH_TABLENAME!,
      Item: authUserItem,
      ConditionExpression: 'attribute_not_exists(#PK)',
      ExpressionAttributeNames: {
        '#PK': 'PK',
      },
    });

    return authUserItem;
  } catch (error) {
    throw new Error(`add user authenticated information/${error}`);
  }
};
