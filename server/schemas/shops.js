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

const singleShopSchema = Joi.object({
  data: Joi.object({
    name: Joi.string(),
    id: Joi.number().integer(),
    identifier: Joi.string(),
    items: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      currency_name: Joi.string().required(),
      id: Joi.number().integer().required(),
      identifier: Joi.string().required(),
      price: Joi.allow([null, Joi.number().integer().required()]),
      sell_price: Joi.allow([null, Joi.number().integer().required()]),
      cat_id: Joi.number().integer().required(),
      cat_name: Joi.string().required()
    })
  )
  })
});

module.exports = { shopListSchema, singleShopSchema };
