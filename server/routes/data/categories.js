const router = require('koa-joi-router');
// const Joi = router.Joi;
const ctrl = require('../../controllers/categories');
const schema = require('../../schemas/categories');
const { getParams } = require('../../middleware/getParams');

const categories = router();

categories.route({
  method: 'get',
  path: '/categories',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.categorySchema,
      },
    },
  },
  handler: [getParams, ctrl.listCategories],
});

categories.post('/categories', (ctx) => {
  ctx.throw(405);
});

categories.put('/categories', (ctx) => {
  ctx.throw(405);
});

categories.patch('/categories', (ctx) => {
  ctx.throw(405);
});

categories.delete('/categories', (ctx) => {
  ctx.throw(405);
});

module.exports = categories;
