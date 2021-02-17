import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

const signIn = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    if (user) {
      const signInUser = user;

      return req.logIn(signInUser, () => res.status(200).send({ login: true }));
    }
    return res.status(401).send(info);
  })(req, res, next);
};

export default signIn;
