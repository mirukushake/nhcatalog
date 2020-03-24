const router = require('koa-joi-router');
const Joi = router.Joi;
const ctrl = require('../../controllers/items');
const schema = require('../../schemas/items');
const { getParams } = require('../../middleware/getParams');

const items = router();

// list of all items
items.route({
  method: 'get',
  path: '/items',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.itemSchema,
      },
    }
  },
  handler: [ getParams, ctrl.listItems ],
});

// list of items by category

items.route({
  method: 'get',
  path: '/items/:id',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.itemSchema,
      },
    }
  },
  handler: [ getParams, ctrl.listCatItems ],
});

items.post('/items', (ctx) => {
  ctx.throw(405);
});

items.put('/items', (ctx) => {
  ctx.throw(405);
});

items.patch('/items', (ctx) => {
  ctx.throw(405);
});

items.delete('/items', (ctx) => {
  ctx.throw(405);
});

items.post('/items/:id', (ctx) => {
  ctx.throw(405);
});

items.put('/items/:id', (ctx) => {
  ctx.throw(405);
});

items.patch('/items/:id', (ctx) => {
  ctx.throw(405);
});

items.delete('/items/:id', (ctx) => {
  ctx.throw(405);
});

module.exports = items;
