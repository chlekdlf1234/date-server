import { IUserModel } from '../../types/model';
import { IHttpRequest, GetUser } from '../../types/common';

export default (getUser: GetUser) => async ({ params }: IHttpRequest): Promise<IUserModel> => {
  try {
    const { userId } = params;

    const user = await getUser({ userId });

    return user;
  } catch (error) {
    throw new Error(`get user/${error}`);
  }
};
