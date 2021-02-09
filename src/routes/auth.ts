import express from 'express';
import passport from 'passport';

import { validate, authRules } from '../middlewares/validator';
import makeCallback from '../middlewares/makeCallback';

import { Controller } from '../types/common';
import { authControllers } from '../controllers/index';

const router = express.Router();

router.post(
  '/login',
  authRules.auth(),
  validate,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

router.post('/register', authRules.auth(), validate, makeCallback((authControllers.postAuthUser as unknown) as Controller));

export default router;
