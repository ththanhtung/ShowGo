import request from 'supertest';
import { app } from '../../app';

it('return a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testk@test.com',
      password: 'validPassword',
    })
    .expect(201); 
},30000);
