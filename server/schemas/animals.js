const router = require('koa-joi-router');
const common = require('./common');
const Joi = router.Joi;

const animalSchema = Joi.object({
  data: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      id: Joi.number().integer().required(),
      identifier: Joi.string().required(),
      personality: Joi.allow([Joi.array(), null]),
      is_npc: Joi.boolean().allow(null),
      birthday: Joi.date().allow(null),
      species: Joi.allow([Joi.array(), null]),
    })
  )
});

module.exports = animalSchema;
