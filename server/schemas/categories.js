const router = require('koa-joi-router');
const Joi = router.Joi;

const categorySchema = Joi.object({
  categories: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      id: Joi.number().integer().required(),
      slug: Joi.string().required(),
      order: Joi.number().integer().allow(null).required(),
      icon: Joi.string().allow(null),
      children: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          id: Joi.number().integer().required(),
          slug: Joi.string().required(),
          order: Joi.number().integer().allow(null).required(),
        }),
      ),
    }),
  ),
  flat: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      id: Joi.number().integer().required(),
      slug: Joi.string().required(),
      order: Joi.number().integer().allow(null).required(),
      parent: Joi.number().integer().allow(null).required(),
    }),
  ),
});

module.exports = { categorySchema };
