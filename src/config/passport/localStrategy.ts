import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

import { authServices } from '../../services/index';

const LocalStrategy = passportLocal.Strategy;

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          // const exUser = await User.findOne({ where: { email } });
          const user = await authServices.getAuthUser({ email });

          if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
              done(null, user);
            } else {
              done(null, false, { message: 'incorrect information' });
            }
          } else {
            done(null, false, { message: 'incorrect information' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
