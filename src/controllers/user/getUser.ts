import { IUserModel } from '../../types/model';
import { IHttpRequest, ServiceFunction, IUserIdParam } from '../../types/common';

export default (getUser: ServiceFunction<IUserIdParam, IUserModel>) => async ({ params }: IHttpRequest): Promise<IUserModel> => {
  try {
    const { userId } = params;

    const user = await getUser({ userId });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
