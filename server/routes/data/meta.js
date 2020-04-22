const router = require('koa-joi-router');
// const Joi = router.Joi;
const ctrl = require('../../controllers/meta');
// const schema = require('../../schemas/meta');
const { getParams } = require('../../middleware/getParams');

const meta = router();

meta.route({
  method: 'get',
  path: '/meta',
  validate: {
    continueOnError: true,
    // output: {
    //   200: {
    //     body: schema.categorySchema,
    //   },
    // },
  },
  handler: [getParams, ctrl.getMetaInformation],
});

meta.post('/meta', (ctx) => {
  ctx.throw(405);
});

meta.put('/meta', (ctx) => {
  ctx.throw(405);
});

meta.patch('/meta', (ctx) => {
  ctx.throw(405);
});

meta.delete('/meta', (ctx) => {
  ctx.throw(405);
});

module.exports = meta;
