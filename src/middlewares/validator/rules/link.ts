import { body, param } from 'express-validator';

// eslint-disable-next-line
const putInvitation = () => [
  param('linkID').isString().withMessage('check linkID param'),
];

const postInvitation = () => [body('guestEmail').isEmail().withMessage('check guest Eamil param')];

export default Object.freeze({
  putInvitation,
  postInvitation,
});
