const router = require('koa-joi-router');
// const Joi = router.Joi;
// const schema = require('../../schemas/recipes');
const ctrl = require('../../controllers/recipes');
const { getParams } = require('../../middleware/getParams');

const recipes = router();

recipes.route({
  method: 'get',
  path: '/recipes',
  validate: {
    continueOnError: true,
  //   output: {
  //     200: {
  //       body: schema.recipeListSchema
  //     }
  // },
  },
  handler: [ getParams, ctrl.listRecipes ],
});

module.exports = recipes;
