const router = require('koa-joi-router');
// const Joi = router.Joi;
const ctrl = require('../../controllers/animals');

const animals = router();

animals.route({
  method: 'get',
  path: '/animals',
  handler: ctrl.listAnimals,
});

module.exports = animals;
