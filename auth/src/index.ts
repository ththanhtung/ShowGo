import express from 'express';
import 'express-async-errors'
import mongoose from 'mongoose';
import cookieSession from 'cookie-session'

import { errorHandler } from './middleware/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';
import { DatabaseConnectionError } from './errors/database-connection-error';

const app = express();
app.set('trust proxy', true)
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: true
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*',async (req, res, next)=>{
    throw new NotFoundError()
})

app.use(errorHandler);

const start =async () => {
  if (!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('connected to mongodb');
  } catch (error) {
    console.error(error);
    throw new DatabaseConnectionError()
  }
}

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});

start()