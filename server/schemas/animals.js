const router = require('koa-joi-router');
const common = require('./common');
const Joi = router.Joi;

const villagerSchema = Joi.object({
  data: Joi.object({
    results: Joi.array().items(
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
  total: Joi.number().integer(),
  })
});

const SPSchema = Joi.object({
  data: Joi.object({
    results: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      id: Joi.number().integer().required(),
      identifier: Joi.string().required(),
      birthday: Joi.date().allow(null),
    })
  ),
  total: Joi.number().integer(),
  })
});

module.exports = { villagerSchema, SPSchema };
