import express from 'express';

import { validate, linkRules } from '../middlewares/validator';
import makeCallback from '../middlewares/makeCallback';
import isLogin from '../middlewares/auth';

import { Controller } from '../types/common';
import { linkControllers } from '../controllers/index';

const router = express.Router();

router.get('/', isLogin, makeCallback((linkControllers.getLinkInformation as unknown) as Controller));
router.post('/invitation', linkRules.postInvitation(), validate, isLogin, makeCallback((linkControllers.postInvitation as unknown) as Controller));

router.put('/:linkID', linkRules.putInvitation(), validate, isLogin, makeCallback((linkControllers.putInvitation as unknown) as Controller));

export default router;
