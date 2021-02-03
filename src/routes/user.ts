import express from 'express';

import { Controller } from '../types/common';
import userControllers from '../controllers/index';

import makeCallback from '../middlewares/makeCallback';

const router = express.Router();

router.get('/:userId', makeCallback((userControllers.getUser as unknown) as Controller));
router.post('/', makeCallback((userControllers.postUser as unknown) as Controller));

export default router;
