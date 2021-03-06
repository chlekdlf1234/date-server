import 'dotenv-safe/config';

import cors from 'cors';
import passport from 'passport';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import Redis from 'ioredis';
import connectRedis from 'connect-redis';

import PassportConfig from './config/passport';

import userRouter from './routes/user';
import authRouter from './routes/auth';
import linkRouter from './routes/link';

import { PROD, COOKIE_NAME } from './constants';

const main = async () => {
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(bodyParser.urlencoded({ extended: false }));

  // cors
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  // session
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: PROD,
        sameSite: 'lax',
        domain: PROD ? '.daildev.com' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    }),
  );

  // passport
  app.use(passport.initialize());
  app.use(passport.session());
  PassportConfig();

  // routes
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/link', linkRouter);

  app.listen(process.env.PORT, () => {
    console.log('Server is listening on port 4000');
  });
};

main().catch((error) => {
  console.log(error);
});
