const router = require('koa-joi-router');
// const Joi = router.Joi;
const ctrl = require('../../controllers/categories');
const { getParams } = require('../../middleware/getParams');

const categories = router();

categories.route({
  method: 'get',
  path: '/categories',
  handler: [getParams, ctrl.listCategories],
});

module.exports = categories;
