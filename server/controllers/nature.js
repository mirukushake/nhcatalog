const Item = require('../models/item');
const Category = require('../models/category');

// list all nature items
async function listNature (ctx) {
  const { language, subtitle } = ctx.state;

  const nature = await Item.query()
    .select('items.id', 'items.identifier')
    .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle)
    .joinRelated('category')
    .join('category_names', 'category_names.cat_id', 'category.id').where('category_names.lang_id', language)
    .select('items.cat_id', 'category_names.name as cat_name', 'category.identifier as cat_identifier', 'size', 'sell_price')
    .where('category.parent', 25).orWhere('category.id', 25)
    .withGraphFetched('[shop(locale, currency, selection), recipes(recipeLocale, recipeInfo).materials(matLocale, info), used_in(usedLocale, usedInfo)]')
    .modifiers({
      locale (builder) {
        builder.modify('nameOnly', 'shop_names', 'name.shop_id', 'shops.id', language);
      },
      matLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'name.item_id', 'items.id', language);
      },
      recipeLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'name.item_id', 'recipes.recipe_id', language);
      },
      usedLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'name.item_id', 'recipes.final_item_id', language);
      },
      selection (builder) {
        builder.select('price', 'identifier');
      },
      info (builder) {
        builder.select('mat_id', 'qty', 'order');
      },
      recipeInfo (builder) {
        builder.select('recipe_id', 'final_item_id');
      },
      usedInfo (builder) {
        builder.select('recipe_items.recipe_id', 'qty');
      },
      currency (builder) {
        builder.modify('currencyName', 'shop_items', language);
      },
    });

  if (nature.length > 0) {
    ctx.status = 200;
    ctx.body = {
      data: nature,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any nature items.',
    };
  }
}

// list single nature type
async function singleListNature (ctx) {
  const { language, subtitle } = ctx.state;
  const cat = ctx.params.id;

  // make sure id is for nature categories
  const idCheck = await Category.query().where('parent', 25).orWhere('id', 25).select('id');
  const idArray = idCheck.map(i => i.id);

  const nature = await Item.query()
    .select('items.id', 'items.identifier')
    .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle)
    .joinRelated('category')
    .join('category_names', 'category_names.cat_id', 'category.id').where('category_names.lang_id', language)
    .select('items.cat_id', 'category_names.name as cat_name', 'category.identifier as cat_identifier', 'size', 'sell_price')
    .whereIn('category.id', idArray).andWhere('category.id', cat)
    .withGraphFetched('[shop(locale, currency, selection), recipes.materials(matLocale, info), used_in(usedLocale, usedInfo)]')
    .modifiers({
      locale (builder) {
        builder.modify('nameOnly', 'shop_names', 'name.shop_id', 'shops.id', language);
      },
      matLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'name.item_id', 'items.id', language);
      },
      usedLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'name.item_id', 'recipes.final_item_id', language);
      },
      selection (builder) {
        builder.select('price', 'identifier');
      },
      info (builder) {
        builder.select('mat_id', 'qty', 'order');
      },
      usedInfo (builder) {
        builder.select('recipe_items.recipe_id', 'qty');
      },
      currency (builder) {
        builder.modify('currencyName', 'shop_items', language);
      },
    });

  if (nature.length > 0) {
    ctx.status = 200;
    ctx.body = {
      data: nature,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any nature items, or this is not a nature items category.',
    };
  }
}

module.exports = { listNature, singleListNature };
