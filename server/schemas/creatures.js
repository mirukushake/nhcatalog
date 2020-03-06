const router = require('koa-joi-router');
const Joi = router.Joi;

const creatureSchema = Joi.object({
  data: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().required(),
      season: Joi.allow([null, Joi.array().items(
        Joi.object({
          id: Joi.number().integer().required(),
          seasons: Joi.array(),
          start_time: Joi.string(),
          end_time: Joi.string(),
          is_allday: Joi.allow([null, Joi.boolean()])
          hemisphere: Joi.string(),
        })
      )]),
      creature: Joi.array().required(),
    })
  )
});

module.exports = animalSchema;
