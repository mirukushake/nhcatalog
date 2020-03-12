const router = require('koa-joi-router');
const schema = require('../../schemas/animals');
const ctrl = require('../../controllers/animals');
const { getParams } = require('../../middleware/getParams');

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
  handler: [ getParams, ctrl.listVillagers ],
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
  handler:  [ getParams, ctrl.listSPCharacters ],
});

module.exports = animals;
