const router = require('koa-joi-router');
const Joi = router.Joi;

const creatureSchema =  Joi.object({
  data: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().required(),
      item_id: Joi.number().integer().required(),
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      identifier: Joi.string().required(),
      section: Joi.number().integer().allow(null),
      order: Joi.number().integer().allow(null),
      cat_id: Joi.number().integer().allow(null),
      season: Joi.allow([null, Joi.array().items(
        Joi.object({
          creature_id: Joi.number().integer(),
        })
      )])
    })
  ),
});


module.exports = { creatureSchema };
