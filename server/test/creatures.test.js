//creatures.test.js
const request = require('supertest');
const server = require('../index.js');

// close the server after each test
afterAll(() => {
 server.close();
});

describe('check route', () => {

test('get /creatures route', async () => {
 const response = await request(server).get('/creatures?locale=en');
 expect(response.status).toEqual(200);
 expect(response.body).toHaveProperty('creatures');
 });

 test('get subtitle', async () => {
 const response = await request(server).get('/creatures?locale=en&subtitle=ja');
 expect(response.status).toEqual(200);
  response.body.creatures.forEach((creature) => {
    expect(creature).toHaveProperty('subtitle');
  });
 });

test('response will be cached', async () => {
 const response = await request(server).get('/creatures?locale=en');
 expect(response.status).toEqual(200);
 expect(response.header).toHaveProperty('cache-control');
 });

  test('post returns forbidden', async () => {
 const response = await request(server).post('/creatures');
 expect(response.status).toEqual(405);
 });

 test('get /creatures/:id route', async () => {
 const response = await request(server).get('/creatures/18?locale=en');
 expect(response.status).toEqual(200);
 expect(response.body).toHaveProperty('creatures');
 });

 test('get item subtitle', async () => {
 const response = await request(server).get('/creatures/18?locale=en&subtitle=ja');
 expect(response.status).toEqual(200);
  response.body.creatures.forEach((item) => {
    expect(item).toHaveProperty('subtitle');
  });
 });

test('single category response will be cached', async () => {
 const response = await request(server).get('/creatures/18?locale=en');
 expect(response.status).toEqual(200);
 expect(response.header).toHaveProperty('cache-control');
 });

  test('single category post returns forbidden', async () => {
 const response = await request(server).post('/creatures/18?locale=en');
 expect(response.status).toEqual(405);
 });
});
