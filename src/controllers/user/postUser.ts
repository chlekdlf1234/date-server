import { IUserAttr, IUserModel } from '../../types/model';
import { IHttpRequest, ServiceFunction } from '../../types/common';

export default (addUser: ServiceFunction<IUserAttr, IUserModel>) => async ({ user, body }: IHttpRequest): Promise<IUserModel> => {
  try {
    const { job, birthday, name } = body;

    const result = await addUser({ email: user!.email, job, birthday, name });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};
