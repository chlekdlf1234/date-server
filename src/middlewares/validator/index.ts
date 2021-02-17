import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import userRules from './rules/user';
import authRules from './rules/auth';
import linkRules from './rules/link';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next!();
  }

  const extractedErrors: object[] = [];

  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export { validate, userRules, authRules, linkRules };
