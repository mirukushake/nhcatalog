const router = require('koa-joi-router');
const Joi = router.Joi;

const searchSchema = Joi.object({
  results: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      cat_name: Joi.string().required(),
      slug: Joi.string().required(),
    }),
  ),
});

module.exports = { searchSchema };
