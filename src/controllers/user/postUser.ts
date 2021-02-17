import { IUserAttr, IUserModel } from '../../types/model';
import { IHttpRequest, ServiceFunction } from '../../types/common';
import deleteKey from '../../helper/deleteKey';

export default (addUser: ServiceFunction<IUserAttr, IUserModel>) => async ({ user, body }: IHttpRequest): Promise<IUserAttr> => {
  try {
    const { job, birthday, name } = body;

    const postedUser = await addUser({ email: user!.email, job, birthday, name });

    const result = deleteKey({ ...postedUser });

    return result as IUserAttr;
  } catch (error) {
    throw new Error(error);
  }
};
