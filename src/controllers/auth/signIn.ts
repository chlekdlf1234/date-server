import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

const signIn = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    if (user) {
      const signInUser = user;

      delete signInUser.password;
      return res.status(200).send(signInUser);
    }
    return res.status(401).send(info);
  })(req, res, next);
};

export default signIn;
