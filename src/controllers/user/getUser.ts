import { IUserModel, IUserAttr } from '../../types/model';
import { IHttpRequest, ServiceFunction, IEmailParam } from '../../types/common';
import deleteKey from '../../helper/deleteKey';

export default (getUser: ServiceFunction<IEmailParam, IUserModel>) => async ({ params }: IHttpRequest): Promise<IUserAttr> => {
  try {
    const { email } = params;

    const user = await getUser({ email });

    const result = deleteKey({ ...user });

    return result as IUserAttr;
  } catch (error) {
    throw new Error(error);
  }
};
