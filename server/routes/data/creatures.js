const router = require('koa-joi-router');
// const Joi = router.Joi;
const schema = require('../../schemas/creatures');
const ctrl = require('../../controllers/creatures');
const { getParams } = require('../../middleware/getParams');

const creatures = router();

creatures.route({
  method: 'get',
  path: '/creatures',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.creatureSchema,
      },
    },
  },
  handler: [getParams, ctrl.listCreatures],
});

creatures.route({
  method: 'get',
  path: '/creatures/:id',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.creatureSchema,
      },
    },
  },
  handler: [getParams, ctrl.listSingleCreature],
});

creatures.post('/creatures', (ctx) => {
  ctx.throw(405);
});

creatures.put('/creatures', (ctx) => {
  ctx.throw(405);
});

creatures.patch('/creatures', (ctx) => {
  ctx.throw(405);
});

creatures.delete('/creatures', (ctx) => {
  ctx.throw(405);
});

creatures.post('/creatures/:id', (ctx) => {
  ctx.throw(405);
});

creatures.put('/creatures/:id', (ctx) => {
  ctx.throw(405);
});

creatures.patch('/creatures/:id', (ctx) => {
  ctx.throw(405);
});

creatures.delete('/creatures/:id', (ctx) => {
  ctx.throw(405);
});


module.exports = creatures;
