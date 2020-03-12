const router = require('koa-joi-router');
const Joi = router.Joi;

const shopListSchema = Joi.object({
  data: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      identifier: Joi.string().required(),
      id: Joi.number().integer().required(),
      is_unlock: Joi.boolean(),
      unlock_method: Joi.allow([null, Joi.string()]),
    })
  )
});

module.exports = { shopListSchema };
