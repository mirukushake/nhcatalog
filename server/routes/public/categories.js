const router = require('koa-joi-router');
const Joi = router.Joi;
const ctrl = require('../../controllers/categories');

const categories = router();

categories.route({
  method: 'get',
  path: '/categories',
  handler: ctrl.listCategories,
});

module.exports = categories;
