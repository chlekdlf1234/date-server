import { authServices, userServices } from '../services/index';

import makeSignUp from './auth/signUp';
import signIn from './auth/signIn';

import makeGetUser from './user/getUser';
import makePostUser from './user/postUser';

import makeGetUserStatus from './user/getUserStatus';

const signUp = makeSignUp(authServices.addAuthUser);

const getUser = makeGetUser(userServices.getUser);
const postUser = makePostUser(userServices.addUser);

const getUserStatus = makeGetUserStatus(userServices.getUserStatus);

const userControllers = Object.freeze({
  getUser,
  postUser,
  getUserStatus,
});

const authControllers = Object.freeze({
  signUp,
  signIn,
});

export { userControllers, authControllers };
