import isValidKey from '../helper/isValidKey';

import buildMakeInvitation from './link/invitation';
import buildMakeLinkedUser from './link/linkedUser';

import buildMakeUser from './user/user';
import buildMakeUserDailyStatus from './user/userDailyStatus';

import buildMakeAuth from './auth/user';

export const makeAuth = buildMakeAuth(isValidKey);
export const makeUser = buildMakeUser(isValidKey);
export const makeUserDailyStatus = buildMakeUserDailyStatus(isValidKey);
export const makeInvitation = buildMakeInvitation(isValidKey);
export const makeLinkedUser = buildMakeLinkedUser(isValidKey);
