import { IUserAttr, IUserModel } from '../../types/model';
import { IHttpRequest, ServiceFunction } from '../../types/common';

export default (addUser: ServiceFunction<IUserAttr, IUserModel>) => async ({ body }: IHttpRequest): Promise<IUserModel> => {
  try {
    const { email, job, birthday, name } = body;

    const user = await addUser({ email, job, birthday, name });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
