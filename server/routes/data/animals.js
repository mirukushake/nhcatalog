const router = require('koa-joi-router');
const animalSchema = require('../../schemas/animals');
const ctrl = require('../../controllers/animals');

const animals = router();

animals.route({
  method: 'get',
  path: '/animals',
  validate: {
    output: {
      200: {
        body: animalSchema
      }
  },
  },
  handler: ctrl.listAnimals,
});

module.exports = animals;
