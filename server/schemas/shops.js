const router = require('koa-joi-router');
const Joi = router.Joi;

const shopListSchema = Joi.object({
  shops: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      slug: Joi.string().required(),
      id: Joi.number().integer().required(),
      is_unlock: Joi.boolean(),
    }),
  ),
});

const singleShopSchema = Joi.object({
  data: Joi.object({
    name: Joi.string(),
    id: Joi.number().integer(),
    slug: Joi.string(),
    items: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        subtitle: Joi.string().optional(),
        currency_name: Joi.string().required(),
        id: Joi.number().integer().required(),
        slug: Joi.string().required(),
        price: Joi.allow([null, Joi.number().integer().required()]),
        sell_price: Joi.allow([null, Joi.number().integer().required()]),
        cat_id: Joi.number().integer().required(),
        cat_name: Joi.string().required(),
      }),
    ),
  }),
});

module.exports = { shopListSchema, singleShopSchema };
