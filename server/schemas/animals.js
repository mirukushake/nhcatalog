const router = require('koa-joi-router');
const Joi = router.Joi;

const villagerSchema = Joi.object({
  data: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      id: Joi.number().integer().required(),
      identifier: Joi.string().required(),
      personality_id: Joi.number().integer().required(),
      personality: Joi.string().required(),
      birthday: Joi.date().allow(null),
      species_id: Joi.number().integer().required(),
      species: Joi.string().required(),
    })
  ),
});

const SPSchema = Joi.object({
  data: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      id: Joi.number().integer().required(),
      identifier: Joi.string().required(),
      birthday: Joi.date().allow(null),
    })
  ),
});

module.exports = { villagerSchema, SPSchema };
