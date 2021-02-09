import express from 'express';

import { validate, userRules } from '../middlewares/validator';
import makeCallback from '../middlewares/makeCallback';
import isLogin from '../middlewares/auth';

import { Controller } from '../types/common';
import { userControllers } from '../controllers/index';

const router = express.Router();

router.get('/:userId', userRules.getUser(), validate, isLogin, makeCallback((userControllers.getUser as unknown) as Controller));
router.post('/', userRules.postUser(), validate, isLogin, makeCallback((userControllers.postUser as unknown) as Controller));

router.get('/:userId/status', userRules.getUserStatus(), validate, isLogin, makeCallback((userControllers.getUserStatus as unknown) as Controller));

export default router;
