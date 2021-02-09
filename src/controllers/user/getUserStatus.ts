import { IUserDailyStatusModel } from '../../types/model';
import { IHttpRequest, IPeriodParam, ServiceFunction } from '../../types/common';

export default (getUserDailyStatus: ServiceFunction<IPeriodParam, IUserDailyStatusModel>) => async ({ params, query }: IHttpRequest): Promise<IUserDailyStatusModel> => {
  try {
    const { email } = params;

    const user = await getUserDailyStatus({ email, period: query.period as string });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
