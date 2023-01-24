import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/tickets';

it('has a route handler listening to /api/tickets for post request', async () => {
  const resp = await request(app).post('/api/tickets').send({});

  expect(resp.status).not.toEqual(404);
});
it('can only be access if the user is sign in', async () => {
  const resp = await request(app).post('/api/tickets').send({}).expect(401);
});
it('return a status other than 401 if the user is signed in', async () => {
  const resp = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});

  expect(resp.status).not.toEqual(401);
});
it('provided an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});
it('provided an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'valid title',
      price: -10,
    })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'valid title',
    })
    .expect(400);
});
it('create a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'valid title',
      price: 20,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual('valid title');
  expect(tickets[0].price).toEqual('20');
});
