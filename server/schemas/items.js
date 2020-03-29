const router = require('koa-joi-router');
const Joi = router.Joi;

const itemSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().required(),
      slug: Joi.string(),
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      cat_name: Joi.string().required(),
      cat_id: Joi.number().integer().required(),
      size: Joi.string().allow(null),
      sell_price: Joi.number().integer().allow(null),
      is_reorder: Joi.boolean().allow(null),
      is_trade: Joi.boolean().allow(null),
      is_remake: Joi.boolean().allow(null),
      image_url: Joi.string().allow('', null),
      shop: Joi.array(),
      recipes: Joi.array(),
      used_in: Joi.array(),
    }),
  ),
});

module.exports = { itemSchema };
