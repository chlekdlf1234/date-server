import { IUserDailyStatusModel } from '../../types/model';
import { IHttpRequest, IUserIdParam, ServiceFunction } from '../../types/common';

export default (getUserDailyStatus: ServiceFunction<IUserIdParam, IUserDailyStatusModel>) => async ({ params }: IHttpRequest): Promise<IUserDailyStatusModel> => {
  try {
    const { userId } = params;

    const user = await getUserDailyStatus({ userId });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
