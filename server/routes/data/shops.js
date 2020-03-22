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
  path: '/shops/:id',
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

module.exports = shops;
