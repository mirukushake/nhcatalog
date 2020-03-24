//items.test.js
const request = require('supertest');
const server = require('../index.js');

// close the server after each test
afterAll(() => {
 server.close();
 console.log('server closed!');
});

describe('check route', () => {

test('get /items route', async () => {
 const response = await request(server).get('/items?locale=en');
 expect(response.status).toEqual(200);
 expect(response.body).toHaveProperty('items');
 });

 test('get subtitle', async () => {
 const response = await request(server).get('/items?locale=en&subtitle=ja');
 expect(response.status).toEqual(200);
  response.body.items.forEach((animal) => {
    expect(animal).toHaveProperty('subtitle');
  });
 });

test('response will be cached', async () => {
 const response = await request(server).get('/items?locale=en');
 expect(response.status).toEqual(200);
 expect(response.header).toHaveProperty('cache-control');
 });

  test('post returns forbidden', async () => {
 const response = await request(server).post('/items');
 expect(response.status).toEqual(405);
 });

 test('get /items/:id route', async () => {
 const response = await request(server).get('/items/5?locale=en');
 expect(response.status).toEqual(200);
 expect(response.body).toHaveProperty('items');
 });

 test('get item subtitle', async () => {
 const response = await request(server).get('/items/5?locale=en&subtitle=ja');
 expect(response.status).toEqual(200);
  response.body.items.forEach((item) => {
    expect(item).toHaveProperty('subtitle');
  });
 });

test('single category response will be cached', async () => {
 const response = await request(server).get('/items/5?locale=en');
 expect(response.status).toEqual(200);
 expect(response.header).toHaveProperty('cache-control');
 });

  test('single category post returns forbidden', async () => {
 const response = await request(server).post('/items/5?locale=en');
 expect(response.status).toEqual(405);
 });
});
