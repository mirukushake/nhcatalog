const router = require('koa-joi-router');
// const Joi = router.Joi;
// const ctrl = require('../../controllers/furniture');

const furniture = router();

// list of all furniture
furniture.route({
  method: 'get',
  path: '/furniture',
  // handler: ctrl.listFurniture,
});

// list of furniture by category

furniture.route({
  method: 'get',
  path: '/furniture/:id',
  // handler: ctrl.singleFurniture
})

module.exports = furniture;
