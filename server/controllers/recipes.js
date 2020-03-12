const Recipe = require('../models/recipe');
const Item = require('../models/item')

// list all recipes
async function listRecipes (ctx) {
  const { language, subtitle } = ctx.state;

  const recipes = await Recipe.query()
    .joinRelated('product(locale)')
    .select('recipes.id', 'recipe_id', 'final_item_id', 'name', 'subtitle')
    .withGraphFetched('materials(locale, info)')
    .modifiers({
      locale: query => query.modify('joinLocale', 'item_names', 'items.id', language, subtitle),
      info: query => query.select('mat_id', 'qty', 'order')
     });

  if (recipes) {
    ctx.status = 200;
    ctx.body = {
      data: recipes,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any recipes.',
    };
  }
}


module.exports = { listRecipes };
