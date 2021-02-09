import { authServices, userServices } from '../services/index';

import makePostAuthUser from './auth/postAuthUser';

import makeGetUser from './user/getUser';
import makePostUser from './user/postUser';

import makeGetUserStatus from './user/getUserStatus';

const postAuthUser = makePostAuthUser(authServices.addAuthUser);

const getUser = makeGetUser(userServices.getUser);
const postUser = makePostUser(userServices.addUser);

const getUserStatus = makeGetUserStatus(userServices.getUserStatus);

const userControllers = Object.freeze({
  getUser,
  postUser,
  getUserStatus,
});

const authControllers = Object.freeze({
  postAuthUser,
});

export { userControllers, authControllers };
