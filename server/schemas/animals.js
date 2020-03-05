const router = require('koa-joi-router');
const Joi = router.Joi;

const animalSchema = Joi.object({
  status: Joi.string().required(),
  data: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      id: Joi.number().integer().required(),
      identifier: Joi.string().required(),
      personality: Joi.any(),
      is_npc: Joi.boolean().allow(null),
      birthday: Joi.date().allow(null),
      species: Joi.any(),
    })
  )
});

module.exports = animalSchema;
