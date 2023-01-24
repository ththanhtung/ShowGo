import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import request from 'supertest'
import { app } from '../app';

let mongo: any;

declare global {
    var signin: () => string[];
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

global.signin = ()=>{
    // build a jwt payload. {id, email}
    const payload = {
        id: 'djdjlsdfj',
        email: 'test@test.com'
    }

    // create the jwt
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    // build session object
    const session = {jwt: token}

    // turn that session into json
    const sessionJSON = JSON.stringify(session)

    // take json and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64')

    // return a string that the cookie with the encoded data
    return [`session=${base64}`];
}