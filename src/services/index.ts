import addPrefix from '../helper/key/addPrefix';

import makeAddUser from './user/addUser';
import makeGetUser from './user/getUser';

import makeAddUserDailyStauts from './user/addUserDailyStatus';
import makeGetUserStatus from './user/getUserStatus';

const addUser = makeAddUser(addPrefix);
const getUser = makeGetUser(addPrefix);

const getUserStatus = makeGetUserStatus(addPrefix);
const addUserDaiyStatus = makeAddUserDailyStauts(addPrefix);

const userServices = Object.freeze({
  addUser,
  getUser,
  getUserStatus,
  addUserDaiyStatus,
});

export default userServices;
