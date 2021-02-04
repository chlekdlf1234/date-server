import { IUserDailyStatusAttr, IUserDailyStatusModel } from '../../types/model';
import { IHttpRequest, ServiceFunction } from '../../types/common';

export default (addUser: ServiceFunction<IUserDailyStatusAttr, IUserDailyStatusModel>) => async ({ body }: IHttpRequest): Promise<IUserDailyStatusModel> => {
  try {
    const { userId, status, dailyStudySeconds, statusStartTime } = body;

    const user = await addUser({ userId, status, dailyStudySeconds, statusStartTime });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
