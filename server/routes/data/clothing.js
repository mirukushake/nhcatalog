const router = require('koa-joi-router');
const Joi = router.Joi;
const ctrl = require('../../controllers/clothing');
const paramSchema = require('../../schemas/common');
const schema = require('../../schemas/shops');
const { getParams } = require('../../middleware/getParams');

const clothing = router();

// list of all clothing
clothing.route({
  method: 'get',
  path: '/clothing',
  validate: {
    continueOnError: true,
  },
  handler: [ getParams, ctrl.listClothing ],
});

// list of clothing by category

clothing.route({
  method: 'get',
  path: '/clothing/:id',
  validate: {
    continueOnError: true,
    params: Joi.number().integer(),
  },
  handler: [ getParams, ctrl.singleListClothing ],
})

module.exports = clothing;
