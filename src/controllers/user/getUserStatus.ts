import { IUserDailyStatusModel, IUserDailyStatusAttr } from '../../types/model';
import { IHttpRequest, IPeriodParam, ServiceFunction } from '../../types/common';
import deleteKey from '../../helper/deleteKey';

export default (getUserDailyStatus: ServiceFunction<IPeriodParam, IUserDailyStatusModel>) => async ({ params, query }: IHttpRequest): Promise<IUserDailyStatusAttr> => {
  try {
    const { email } = params;

    const user = await getUserDailyStatus({ email, period: query.period as string });

    const result = deleteKey({ ...user });

    return result as IUserDailyStatusAttr;
  } catch (error) {
    throw new Error(error);
  }
};
