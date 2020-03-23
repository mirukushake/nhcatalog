const router = require('koa-joi-router');
const Joi = router.Joi;

const creatureSchema =  Joi.object({
  creatures: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().required(),
      item_id: Joi.number().integer().required(),
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      section: Joi.number().integer().allow(null),
      order: Joi.number().integer().allow(null),
      cat_id: Joi.number().integer().allow(null),
      season: Joi.allow([null, Joi.array().items(
        Joi.object({
          creature_id: Joi.number().integer(),
          seasons: Joi.array().items(Joi.number().integer()).required(),
          start_time: Joi.string().allow(null),
          end_time: Joi.string().allow(null),
          is_allday: Joi.boolean().required(),
          hemisphere: Joi.string().valid('north', 'south').required(),
        })
      )])
    })
  ),
});


module.exports = { creatureSchema };
