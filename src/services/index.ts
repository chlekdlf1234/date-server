import addPrefix from '../helper/addPrefix';

import makeAddAuthUser from './auth/addAuthUser';
import makeGetAuthUser from './auth/getAuthUser';

import makeAddUser from './user/addUser';
import makeGetUser from './user/getUser';

import makeAddUserDailyStauts from './user/addUserDailyStatus';
import makeGetUserStatus from './user/getUserStatus';

const addAuthUser = makeAddAuthUser(addPrefix);
const getAuthUser = makeGetAuthUser(addPrefix);

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

const authServices = Object.freeze({
  getAuthUser,
  addAuthUser,
});

export { userServices, authServices };
