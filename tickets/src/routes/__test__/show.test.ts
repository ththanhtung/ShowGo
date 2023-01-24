import request from 'supertest';
import { app } from '../../app';

it('return 404 if the ticket is not found', async () => {
  await request(app).get('/api/tickets/fakeid').send();
});
it('return the ticket if the ticket is found', async () => {
    const title = 'valid title'
    const price = 20
  const resp = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  await request(app).get(`/api/tickets/${resp.body.id}`).send().expect(200);
  expect(resp.body.title).toEqual(title)
  expect(resp.body.price).toEqual(price)
});
