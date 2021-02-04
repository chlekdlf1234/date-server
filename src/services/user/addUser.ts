import { IUserAttr, IUserModel } from '../../types/model';
import { AddPrefix } from '../../types/helper';

import dynamoDB from '../../helper/db/dynamodb';
import { makeUser } from '../../models/index';

// eslint-disable-next-line
export default (addPrefix: AddPrefix) => async ({
  userId,
  name,
  birthday,
  job,
}: IUserAttr): Promise<IUserModel> => {
  try {
    const key = addPrefix({
      model: 'user',
      key: {
        PK: userId,
        GSI1PK: userId,
      },
    });

    const user = makeUser({ ...key, name, birthday, job, userId });

    const userItem = {
      PK: user.getPK(),
      SK: user.getSK(),
      GSI1PK: user.getPK(),
      GSI1SK: user.getPK(),
      name: user.getName(),
      birthday: user.getBirthday(),
      job: user.getJob(),
      userId: user.getUserId(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };

    await dynamoDB.put({
      TableName: process.env.TABLENAME!,
      Item: userItem,
    });

    return userItem;
  } catch (error) {
    throw new Error(`add user/${error}`);
  }
};
