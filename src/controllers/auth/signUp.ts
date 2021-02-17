import { IAuthAttr, IAuthModel } from '../../types/model';
import { IHttpRequest, ServiceFunction } from '../../types/common';

interface IReturn {
  register: boolean;
}

export default (addAuthUser: ServiceFunction<IAuthAttr, IAuthModel>) => async ({ body }: IHttpRequest): Promise<IReturn> => {
  try {
    const { email, password } = body;

    await addAuthUser({ email, password });

    return { register: true };
  } catch (error) {
    throw new Error(error);
  }
};
