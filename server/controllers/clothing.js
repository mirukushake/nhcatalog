const Item = require('../models/item');
const Category = require('../models/category');

// list all clothing
async function listClothing (ctx) {
  const { language, subtitle } = ctx.state;

  const clothing = await Item.query()
    .select('items.id', 'items.slug')
    .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle)
    .joinRelated('category')
    .join('category_names', 'category_names.cat_id', 'category.id').where('category_names.lang_id', language)
    .select('items.cat_id', 'category_names.name as cat_name', 'category.slug as cat_slug', 'size', 'sell_price')
    .where('category.parent', 35).orWhere('category.id', 35)
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
        builder.select('price', 'slug');
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

  if (clothing) {
    ctx.status = 200;
    ctx.body = {
      data: clothing,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any clothing.',
    };
  }
}

// list single clothing type
async function singleListClothing (ctx) {
  const { language, subtitle } = ctx.state;
  const cat = ctx.params.id;

  // make sure id is for clothing categories
  const idCheck = await Category.query().where('parent', 35).orWhere('id', 35).select('id');
  const idArray = idCheck.map(i => i.id);

  const clothing = await Item.query()
    .select('items.id', 'items.slug')
    .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle)
    .joinRelated('category')
    .join('category_names', 'category_names.cat_id', 'category.id').where('category_names.lang_id', language)
    .select('items.cat_id', 'category_names.name as cat_name', 'category.slug as cat_slug', 'size', 'sell_price')
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
        builder.select('price', 'slug');
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

  if (clothing) {
    ctx.status = 200;
    ctx.body = {
      data: clothing,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any clothing, or this is not a clothing category.',
    };
  }
}

module.exports = { listClothing, singleListClothing };
