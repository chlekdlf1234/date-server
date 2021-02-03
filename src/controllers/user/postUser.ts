import { IUserModel } from '../../types/model';
import { IHttpRequest, AddUser } from '../../types/common';

export default (addUser: AddUser) => async ({ body }: IHttpRequest): Promise<IUserModel> => {
  try {
    const user = await addUser(body);

    return user;
  } catch (error) {
    throw new Error(`post user/${error}`);
  }
};
