import user from '../services/index';

import makeGetUser from './user/getUser';
import makePostUser from './user/postUser';

const getUser = makeGetUser(user.getUser);
const postUser = makePostUser(user.addUser);

const userServices = Object.freeze({
  getUser,
  postUser,
});

export default userServices;
