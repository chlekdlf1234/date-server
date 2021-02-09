import { IUserModel } from '../../types/model';
import { IHttpRequest, ServiceFunction, IEmailParam } from '../../types/common';

export default (getUser: ServiceFunction<IEmailParam, IUserModel>) => async ({ params }: IHttpRequest): Promise<IUserModel> => {
  try {
    const { email } = params;

    const user = await getUser({ email });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
