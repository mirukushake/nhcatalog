const router = require('koa-joi-router');
const schema = require('../../schemas/recipes');
const ctrl = require('../../controllers/recipes');
const { getParams } = require('../../middleware/getParams');

const recipes = router();

recipes.route({
  method: 'get',
  path: '/recipes',
  validate: {
    continueOnError: true,
    output: {
      200: {
        body: schema.recipeListSchema
        }
    },
  },
  handler: [ getParams, ctrl.listRecipes ],
});

recipes.post('/recipes', (ctx) => {
  ctx.throw(405);
});

recipes.put('/recipes', (ctx) => {
  ctx.throw(405);
});

recipes.patch('/recipes', (ctx) => {
  ctx.throw(405);
});

recipes.delete('/recipes', (ctx) => {
  ctx.throw(405);
});

module.exports = recipes;
