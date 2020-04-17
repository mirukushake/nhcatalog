const router = require('koa-joi-router');
const Joi = router.Joi;

const animalSchema = Joi.object({
  animals: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      id: Joi.number().integer().required(),
      slug: Joi.string().required(),
      personality_id: Joi.number().integer().optional(),
      personality: Joi.string().optional(),
      birthday: Joi.date().allow(null),
      species_id: Joi.number().integer().optional(),
      species: Joi.string().optional(),
      image_url: Joi.string().allow(null),
    }),
  ),
});

module.exports = { animalSchema };
