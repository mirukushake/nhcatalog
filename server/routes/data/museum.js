const router = require('koa-joi-router');
// const Joi = router.Joi;
// const ctrl = require('../../controllers/museum');

const museum = router();

museum.route({
  method: 'get',
  path: '/museum',
  // handler: ctrl.listMuseum,
});

module.exports = museum;
