import request from 'supertest'
import { app } from '../../app';

it('response with detail about the current user', async ()=>{
    const authResp = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    const cookie = authResp.get('Set-Cookie')

    const resp = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200)

    expect(resp.body.currentUser.email).toEqual('test@test.com')
})