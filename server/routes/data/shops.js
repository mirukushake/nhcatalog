const router = require('koa-joi-router');
const schema = require('../../schemas/shops');
const ctrl = require('../../controllers/shops');
const { getParams } = require('../../middleware/getParams');

const shops = router();

shops.route({
  method: 'get',
  path: '/shops',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.shopListSchema,
      },
    },
  },
  handler: [getParams, ctrl.listShops],
});

shops.route({
  method: 'get',
  path: '/shops/:slug',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.singleShopSchema,
      },
    },
  },
  handler: [getParams, ctrl.singleShop],
});

shops.post('/shops', (ctx) => {
  ctx.throw(405);
});

shops.put('/shops', (ctx) => {
  ctx.throw(405);
});

shops.patch('/shops', (ctx) => {
  ctx.throw(405);
});

shops.delete('/shops', (ctx) => {
  ctx.throw(405);
});

shops.post('/shops/:id', (ctx) => {
  ctx.throw(405);
});

shops.put('/shops/:id', (ctx) => {
  ctx.throw(405);
});

shops.patch('/shops/:id', (ctx) => {
  ctx.throw(405);
});

shops.delete('/shops/:id', (ctx) => {
  ctx.throw(405);
});

module.exports = shops;
