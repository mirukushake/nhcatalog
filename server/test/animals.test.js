//routes.test.js
const request = require('supertest');
const server = require('../index.js');

// close the server after each test
afterAll(() => {
 server.close();
 console.log('server closed!');
});

describe('basic route test', () => {
 test('get /animals route', async () => {
 const response = await request(server).get('/animals');
 expect(response.status).toEqual(200);
 expect(response.body).toHaveProperty('data');
 });
});
