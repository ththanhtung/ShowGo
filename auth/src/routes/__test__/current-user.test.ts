import request from 'supertest'
import { app } from '../../app';

it('response with detail about the current user', async ()=>{
    const cookie = await global.signin()

    const resp = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200)

    expect(resp.body.currentUser.email).toEqual('test@test.com')
})