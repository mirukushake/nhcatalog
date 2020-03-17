const router = require('koa-joi-router');
const Joi = router.Joi;
const ctrl = require('../../controllers/publicworks');
const { getParams } = require('../../middleware/getParams');

const works = router();

// list of all public works
works.route({
  method: 'get',
  path: '/publicworks',
  handler: [ getParams, ctrl.listWorks ],
});

// list of public works by category

// works.route({
//   method: 'get',
//   path: '/works/:id',
//   validate: {
//     continueOnError: true,
//     params: Joi.number().integer(),
//   },
//   handler: [ getParams, ctrl.singleListNature ],
// })

module.exports = works;
