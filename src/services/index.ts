import addPrefix from '../helper/key/addPrefix';

import makeAddUser from './user/addUser';
import makeGetUser from './user/getUser';

const addUser = makeAddUser(addPrefix);
const getUser = makeGetUser(addPrefix);

const userServices = Object.freeze({
  addUser,
  getUser,
});

export default userServices;
