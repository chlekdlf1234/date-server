import addPrefix from '../helper/key/addPrefix';

import makeAddUser from './user/addUser';
import makeGetUser from './user/getUser';

import makeAddUserDailyStauts from './user/addUserDailyStatus';
import makeGetUserDailyStatus from './user/getUserDailyStatus';

const addUser = makeAddUser(addPrefix);
const getUser = makeGetUser(addPrefix);

const addUserDaiyStatus = makeAddUserDailyStauts(addPrefix);
const getUserDaiyStatus = makeGetUserDailyStatus(addPrefix);

const userServices = Object.freeze({
  addUser,
  getUser,
  addUserDaiyStatus,
  getUserDaiyStatus,
});

export default userServices;
