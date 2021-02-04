import user from '../services/index';

import makeGetUser from './user/getUser';
import makePostUser from './user/postUser';

import makeGetUserStatus from './user/getUserStatus';

const getUser = makeGetUser(user.getUser);
const postUser = makePostUser(user.addUser);

const getUserStatus = makeGetUserStatus(user.getUserStatus);

const userServices = Object.freeze({
  getUser,
  postUser,
  getUserStatus,
});

export default userServices;
