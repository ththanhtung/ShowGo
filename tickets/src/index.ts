import mongoose from 'mongoose';
import {app} from './app'
import { DatabaseConnectionError } from '@vigacorp/common';

const port = process.env.PORT || 3000;

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