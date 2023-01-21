import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongo: any;

declare global {
    var signin: () => Promise<string[]>;
}

beforeAll(async ()=>{
    process.env.JWT_KEY = 'asdf';
    mongo = await MongoMemoryServer.create()
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, {})
})

beforeEach(async ()=>{
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections){
        await collection.deleteMany({})
    }
})

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  } 
  await mongoose.connection.close();
});