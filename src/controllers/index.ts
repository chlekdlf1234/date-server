import { authServices, userServices, linkServices } from '../services/index';

import makeGetLinkInformation from './link/getLinkInformation';
import makePostInvitation from './link/postInvitation';
import makePutInvitation from './link/putInvitation';

import makeSignUp from './auth/signUp';
import signIn from './auth/signIn';

import makeGetUser from './user/getUser';
import makePostUser from './user/postUser';

import makeGetUserStatus from './user/getUserStatus';

const getLinkInformation = makeGetLinkInformation(linkServices.getLinkInformation);
const postInvitation = makePostInvitation(linkServices.addInvitation);
const putInvitation = makePutInvitation(linkServices.confirmInvitation);

const signUp = makeSignUp(authServices.addAuthUser);

const getUser = makeGetUser(userServices.getUser);
const postUser = makePostUser(userServices.addUser);

const getUserStatus = makeGetUserStatus(userServices.getUserStatus);

const linkControllers = Object.freeze({
  getLinkInformation,
  postInvitation,
  putInvitation,
});

const userControllers = Object.freeze({
  getUser,
  postUser,
  getUserStatus,
});

const authControllers = Object.freeze({
  signUp,
  signIn,
});

export { userControllers, authControllers, linkControllers };
