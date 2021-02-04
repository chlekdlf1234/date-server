import { IUserDailyStatusModel } from '../../types/model';
import { IHttpRequest, IPeriodParam, ServiceFunction } from '../../types/common';

export default (getUserDailyStatus: ServiceFunction<IPeriodParam, IUserDailyStatusModel>) => async ({ params, query }: IHttpRequest): Promise<IUserDailyStatusModel> => {
  try {
    const { userId } = params;

    const user = await getUserDailyStatus({ userId, period: query.period as string });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
