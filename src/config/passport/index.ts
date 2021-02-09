import passport from 'passport';
import local from './localStrategy';

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.PK);
  });

  passport.deserializeUser((PK: Express.User, done) => {
    done(null, PK);
  });

  local();
};
