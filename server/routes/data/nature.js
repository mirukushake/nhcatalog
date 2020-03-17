const router = require('koa-joi-router');
const Joi = router.Joi;
const ctrl = require('../../controllers/nature');
const { getParams } = require('../../middleware/getParams');

const nature = router();

// list of all nature items
nature.route({
  method: 'get',
  path: '/nature',
  handler: [ getParams, ctrl.listNature ],
});

// list of nature items by category

nature.route({
  method: 'get',
  path: '/nature/:id',
  validate: {
    continueOnError: true,
    params: Joi.number().integer(),
  },
  handler: [ getParams, ctrl.singleListNature ],
})

module.exports = nature;
