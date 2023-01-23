import mongoose from 'mongoose';
import {app} from './app'
import { DatabaseConnectionError } from '@vigacorp/common';

const port = process.env.PORT || 3000;

const start =async () => {
  if (!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined')
  }
  if (!process.env.MONGO_URI){
    throw new Error('MONGO_URI should be defined')
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
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