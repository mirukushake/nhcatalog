const router = require('koa-joi-router');
const Joi = router.Joi;

const recipeListSchema = Joi.object({
  recipes: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().required(),
      recipe_id: Joi.number().integer().required(),
      final_item_id: Joi.number().integer().required(),
      name: Joi.string().required(),
      subtitle: Joi.string().optional(),
      cat_id: Joi.number().integer().required(),
      cat_name: Joi.string().required(),
      materials: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          mat_id: Joi.number().integer().required(),
          qty: Joi.number().integer().required(),
        })
      )
    })
  ),
});

module.exports = { recipeListSchema };
