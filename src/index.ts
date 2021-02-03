import 'dotenv-safe/config';

import AWS from 'aws-sdk';

import express from 'express';
import bodyParser from 'body-parser';
import AWSConfig from './config/AWS/config';

import userRouter from './routes/user';

const main = async () => {
  AWS.config.update(AWSConfig);

  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/users', userRouter);

  app.listen(4000, () => {
    console.log('Server is listening on port 4000');
  });
};

main().catch((error) => {
  console.log(error);
});
