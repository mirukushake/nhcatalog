const router = require('koa-joi-router');
// const Joi = router.Joi;
const schema = require('../../schemas/museum');
const ctrl = require('../../controllers/museum');
const { getParams } = require('../../middleware/getParams');

const museum = router();

museum.route({
  method: 'get',
  path: '/museum/creatures',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.creatureSchema
      }
  },
  },
  handler: [ getParams, ctrl.listCreatures ],
});

// museum.route({
//   method: 'get',
//   path: '/fossils',
//   validate: {
//     continueOnError: true
//   },
//   handler: ctrl.listMuseum,
// });

module.exports = museum;
