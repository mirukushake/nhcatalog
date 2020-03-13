const router = require('koa-joi-router');
const Joi = router.Joi;
const ctrl = require('../../controllers/collectibles');
const { getParams } = require('../../middleware/getParams');

const collectibles = router();

// list of all collectibles
collectibles.route({
  method: 'get',
  path: '/collectibles',
  handler: [ getParams, ctrl.listCollectibles ],
});

// list of collectibles by category

collectibles.route({
  method: 'get',
  path: '/collectibles/:id',
  validate: {
    continueOnError: true,
    params: Joi.number().integer(),
  },
  handler: [ getParams, ctrl.singleListCollectible ],
})

module.exports = collectibles;
