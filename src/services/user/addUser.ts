import { IUserAttr, IUserModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';

import dynamoDB from '../../helper/dynamodb';
import { makeUser } from '../../models/index';

// eslint-disable-next-line
export default (addPrefix: AddPrefix) => async ({
  email,
  name,
  birthday,
  job,
}: IUserAttr): Promise<IUserModel> => {
  try {
    const key = addPrefix({
      model: 'user',
      key: {
        PK: email,
        GSI1PK: email,
      },
    });

    const user = makeUser({ ...key, name, birthday, job, email });

    const userItem = {
      PK: user.getPK(),
      SK: user.getSK(),
      GSI1PK: user.getPK(),
      GSI1SK: user.getPK(),
      name: user.getName(),
      birthday: user.getBirthday(),
      job: user.getJob(),
      email: user.getEmail(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };

    await dynamoDB.put({
      TableName: process.env.TABLENAME!,
      Item: userItem,
      ConditionExpression: 'attribute_not_exists(#PK)',
      ExpressionAttributeNames: {
        '#PK': 'PK',
      },
    });

    return userItem;
  } catch (error) {
    throw new Error(`add user/${error}`);
  }
};
