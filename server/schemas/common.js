const router = require('koa-joi-router');
const Joi = router.Joi;

const singleAttribute = Joi.object({
  name: Joi.string().required(),
  subtitle: Joi.string().optional(),
  id: Joi.number().integer().required(),
});

module.exports = singleAttribute;
