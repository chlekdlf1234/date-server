import { Models, Attrs } from '../types/model';

const deleteKey = (obj: Models): Attrs => {
  const key = ['PK', 'SK', 'GSI1PK', 'GSI1SK', 'GSI2PK'];
  const returnObj = obj;

  const objectKeys = Object.keys(obj);

  objectKeys.forEach((item) => {
    if (key.includes(item)) {
      delete returnObj[item as keyof Models];
    }
  });

  return returnObj;
};

export default deleteKey;
