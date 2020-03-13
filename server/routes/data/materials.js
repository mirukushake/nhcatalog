const router = require('koa-joi-router');
// const Joi = router.Joi;
const ctrl = require('../../controllers/materials');
const { getParams } = require('../../middleware/getParams');

const materials = router();

// list of all materials
materials.route({
  method: 'get',
  path: '/materials',
  handler: [ getParams, ctrl.listMaterials ],
});

module.exports = materials;
