const router = require('koa-joi-router');
const Joi = router.Joi;
const ctrl = require('../../controllers/items');
const paramSchema = require('../../schemas/common');
const schema = require('../../schemas/shops');
const { getParams } = require('../../middleware/getParams');

const items = router();

// list of all items
items.route({
  method: 'get',
  path: '/items',
  validate: {
    continueOnError: true,
  },
  handler: [ getParams, ctrl.listItems ],
});

// list of items by category

// items.route({
//   method: 'get',
//   path: '/items/:id',
//   validate: {
//     continueOnError: true,
//     params: Joi.number().integer(),
//   },
//   handler: [ getParams, ctrl.singleListitems ],
// })

module.exports = items;
