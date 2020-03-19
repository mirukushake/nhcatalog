const router = require('koa-joi-router');
const schema = require('../../schemas/animals');
const ctrl = require('../../controllers/animals');
const { getParams } = require('../../middleware/getParams');

const animals = router();

animals.route({
  method: 'get',
  path: '/animals',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.animalSchema
      }
  },
  },
  handler: [ getParams, ctrl.listAnimals ],
});

module.exports = animals;
