const router = require('koa-joi-router');
const schema = require('../../schemas/animals');
const ctrl = require('../../controllers/animals');

const animals = router();

animals.route({
  method: 'get',
  path: '/villagers',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.villagerSchema
      }
  },
  },
  handler: ctrl.listVillagers,
});

animals.route({
  method: 'get',
  path: '/special-characters',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.SPSchema
      }
  },
  },
  handler: ctrl.listSPCharacters,
});

module.exports = animals;
