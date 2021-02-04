import { body, param, query } from 'express-validator';

const getUser = () => [param('userId').isString().withMessage('check userId param')];

// eslint-disable-next-line
const getUserStatus = () => [
  param('userId').isString().withMessage('check userId param'),
  query('period').isIn(['day', 'week', 'month']).withMessage('check period param'),
];

const postUser = () => [
  body('userId').isString().withMessage('check userId param'),
  body('job').isString().withMessage('check job param'),
  body('birthday').isNumeric().withMessage('check birthday param'),
  body('name').isString().withMessage('check name param'),
];

export default Object.freeze({
  getUser,
  postUser,
  getUserStatus,
});
