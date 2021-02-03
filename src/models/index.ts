import isValidKey from '../helper/key/isValidKey';

import buildMakeUser from './user/user';
import buildMakeUserDailyStatus from './user/userDailyStatus';

export const makeUser = buildMakeUser(isValidKey);
export const makeUserDailyStatus = buildMakeUserDailyStatus(isValidKey);
