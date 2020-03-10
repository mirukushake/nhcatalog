const router = require('koa-joi-router');
// const Joi = router.Joi;
const ctrl = require('../../controllers/museum');

const museum = router();

museum.route({
  method: 'get',
  path: '/creatures',
  validate: {
    continueOnError: true
  },
  handler: ctrl.listCreatures,
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
