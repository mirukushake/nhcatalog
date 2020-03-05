const router = require('koa-joi-router');
// const Joi = router.Joi;
// const ctrl = require('../../controllers/categories');

const clothing = router();

// list of all clothing
clothing.route({
  method: 'get',
  path: '/clothing',
  handler: ctrl.listCategories,
});

// list of clothing by category

clothing.route({
  method: 'get',
  path: '/clothing/:id'
  handler: null,
})

module.exports = clothing;
