const router = require('koa-joi-router');
const Joi = router.Joi;

const recipeListSchema = Joi.object({
  recipes: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().required(),
      final_item_id: Joi.number().integer().required(),
      recipe_item_id: Joi.number().integer().allow(null),
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      cat_id: Joi.number().integer().required(),
      cat_name: Joi.string().required(),
      image_url: Joi.string().allow(null),
      materials: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          plural: Joi.string().allow(null),
          mat_id: Joi.number().integer().required(),
          qty: Joi.number().integer().required(),
        }),
      ),
    }),
  ),
});

module.exports = { recipeListSchema };
