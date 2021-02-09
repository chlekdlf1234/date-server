import { body } from 'express-validator';

// eslint-disable-next-line
const auth = () => [
  body('email').isEmail().withMessage('check email'),
  body('password').isString().withMessage('check password'),
];

export default Object.freeze({
  auth,
});
