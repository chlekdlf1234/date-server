import addPrefix from '../helper/addPrefix';

import makeAddInvitation from './link/addInvitation';
import makeConfirmInvitation from './link/confirmInvitation';
import makeGetLinkInformation from './link/getLinkInformation';

import makeAddAuthUser from './auth/addAuthUser';
import makeGetAuthUser from './auth/getAuthUser';

import makeAddUser from './user/addUser';
import makeGetUser from './user/getUser';

import makeAddUserDailyStauts from './user/addUserDailyStatus';
import makeGetUserStatus from './user/getUserStatus';

const addInvitation = makeAddInvitation(addPrefix);
const confirmInvitation = makeConfirmInvitation(addPrefix);
const getLinkInformation = makeGetLinkInformation(addPrefix);

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

const linkServices = Object.freeze({
  addInvitation,
  confirmInvitation,
  getLinkInformation,
});

export { userServices, authServices, linkServices };
