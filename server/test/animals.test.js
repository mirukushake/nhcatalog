//animals.test.js
const request = require('supertest');
const server = require('../index.js');

// close the server after each test
afterAll(() => {
 server.close();
 console.log('server closed!');
});

describe('check route', () => {

test('get /animals route', async () => {
 const response = await request(server).get('/animals?locale=en');
 expect(response.status).toEqual(200);
 expect(response.body).toHaveProperty('animals');
 });

 test('get subtitle', async () => {
 const response = await request(server).get('/animals?locale=en&subtitle=ja');
 expect(response.status).toEqual(200);
  response.body.animals.forEach((animal) => {
    expect(animal).toHaveProperty('subtitle');
  });
 });

test('response will be cached', async () => {
 const response = await request(server).get('/animals?locale=en');
 expect(response.status).toEqual(200);
 expect(response.header).toHaveProperty('cache-control');
 });

  test('post returns forbidden', async () => {
 const response = await request(server).post('/animals');
 expect(response.status).toEqual(405);
 });
});
