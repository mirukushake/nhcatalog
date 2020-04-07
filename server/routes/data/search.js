const router = require('koa-joi-router');
// const Joi = router.Joi;
const ctrl = require('../../controllers/search');
// const schema = require('../../schemas/categories');
const { getParams } = require('../../middleware/getParams');

const search = router();

search.route({
  method: 'get',
  path: '/search',
  validate: {
    continueOnError: true,
    output: {
      // 200: {
      //   body: schema.categorySchema,
      // },
    },
  },
  handler: [getParams, ctrl.search],
});

search.post('/search', (ctx) => {
  ctx.throw(405);
});

search.put('/search', (ctx) => {
  ctx.throw(405);
});

search.patch('/search', (ctx) => {
  ctx.throw(405);
});

search.delete('/search', (ctx) => {
  ctx.throw(405);
});

module.exports = search;
