//shops.test.js
const request = require('supertest');
const server = require('../index.js');

// close the server after each test
afterAll(() => {
 server.close();
 console.log('server closed!');
});

describe('check route', () => {

test('get /shops route', async () => {
 const response = await request(server).get('/shops?locale=en');
 expect(response.status).toEqual(200);
 expect(response.body).toHaveProperty('shops');
 });

 test('get subtitle', async () => {
 const response = await request(server).get('/shops?locale=en&subtitle=ja');
 expect(response.status).toEqual(200);
  response.body.shops.forEach((shop) => {
    expect(shop).toHaveProperty('subtitle');
  });
 });

test('response will be cached', async () => {
 const response = await request(server).get('/shops?locale=en');
 expect(response.status).toEqual(200);
 expect(response.header).toHaveProperty('cache-control');
 });

  test('post returns forbidden', async () => {
 const response = await request(server).post('/shops');
 expect(response.status).toEqual(405);
 });

test('get /shops/:id route', async () => {
 const response = await request(server).get('/shops/1?locale=en');
 expect(response.status).toEqual(200);
 expect(response.body).toHaveProperty('shop');
 expect(response.body.shop).toHaveProperty('items');
 });

 test('get shop/items subtitle', async () => {
 const response = await request(server).get('/shops/1?locale=en&subtitle=ja');
 expect(response.status).toEqual(200);
  response.body.shop.items.forEach((item) => {
    expect(item).toHaveProperty('subtitle');
  });
 });

test('single shop response will be cached', async () => {
 const response = await request(server).get('/shops/1?locale=en');
 expect(response.status).toEqual(200);
 expect(response.header).toHaveProperty('cache-control');
 });

  test('single shop post returns forbidden', async () => {
 const response = await request(server).post('/shops/1?locale=en');
 expect(response.status).toEqual(405);
 });

});
