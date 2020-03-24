const Recipe = require('../models/recipe');
// const Item = require('../models/item');

// list all recipes
async function listRecipes (ctx) {
  const { language, subtitle } = ctx.state;

  const recipes = await Recipe.query()
    .select('recipes.id', 'final_item_id', 'recipe_item_id')
    .modify('setLocale', 'item_names', 'item_id', 'final_item_id', language, subtitle)
    .joinRelated('product')
    .join('category_names', 'category_names.cat_id', 'product.cat_id').where('category_names.lang_id', language)
    .select('product.cat_id', 'category_names.name as cat_name')
    .withGraphFetched('materials(locale, info)')
    .modifiers({
      locale (builder) {
        builder.modify('setLocale', 'item_names', 'item_id', 'items.id', language);
      },
      info (builder) {
        builder.select('mat_id', 'qty').orderBy('order');
      },
    });

  if (recipes) {
    ctx.set('Cache-Control', 'max-age=3600');
    ctx.status = 200;
    ctx.body = { recipes };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any recipes.',
    };
  }
}

module.exports = { listRecipes };
