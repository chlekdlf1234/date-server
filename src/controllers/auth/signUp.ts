import { IAuthAttr, IAuthModel } from '../../types/model';
import { IHttpRequest, ServiceFunction } from '../../types/common';

export default (addAuthUser: ServiceFunction<IAuthAttr, IAuthModel>) => async ({ body }: IHttpRequest): Promise<IAuthModel> => {
  try {
    const { email, password } = body;

    const user = await addAuthUser({ email, password });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
