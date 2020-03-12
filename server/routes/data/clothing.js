const router = require('koa-joi-router');
// const Joi = router.Joi;
const ctrl = require('../../controllers/clothing');
const { getParams } = require('../../middleware/getParams');

const clothing = router();

// list of all clothing
clothing.route({
  method: 'get',
  path: '/clothing',
  handler: [ getParams, ctrl.listClothing ],
});

// list of clothing by category

clothing.route({
  method: 'get',
  path: '/clothing/:id',
  handler: [ getParams, ctrl.singleListClothing ],
})

module.exports = clothing;
