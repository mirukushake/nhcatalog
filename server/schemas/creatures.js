const router = require('koa-joi-router');
const Joi = router.Joi;

const creatureSchema = Joi.object({
  creatures: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().required(),
      item_id: Joi.number().integer().required(),
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      section: Joi.number().integer().allow(null),
      order: Joi.number().integer().allow(null),
      sell_price: Joi.number().integer().allow(null),
      cat_id: Joi.number().integer().allow(null),
      cat_name: Joi.string().optional(),
      start_time: Joi.array().allow(null),
      end_time: Joi.array().allow(null),
      is_allday: Joi.boolean().allow(null),
      image_url: Joi.string().allow('', null),
      // location: Joi.string().allow(null),
      season: Joi.allow([null, Joi.array().items(
        Joi.object({
          creature_id: Joi.number().integer(),
          seasons: Joi.array().items(Joi.number().integer()).allow(null),
          is_allyear: Joi.boolean().allow(null),
          hemisphere: Joi.string().valid('north', 'south').required(),
        }),
      )]),
    }),
  ),
});

module.exports = { creatureSchema };
