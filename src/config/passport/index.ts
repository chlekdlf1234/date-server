import { String } from 'aws-sdk/clients/batch';
import passport from 'passport';
import local from './localStrategy';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email: String, done) => {
    done(null, { email } as Express.User);
  });

  local();
};
