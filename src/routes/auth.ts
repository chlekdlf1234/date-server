import express from 'express';

import { validate, authRules } from '../middlewares/validator';
import makeCallback from '../middlewares/makeCallback';

import { Controller } from '../types/common';
import { authControllers } from '../controllers/index';

const router = express.Router();

router.post('/login', authRules.auth(), validate, authControllers.signIn);

router.post('/register', authRules.auth(), validate, makeCallback((authControllers.signUp as unknown) as Controller));

export default router;
