const Item = require('../models/item');

// list all items
async function listItems (ctx) {
  const { language, subtitle } = ctx.state;

  const items = await Item.query()
    .select('items.id', 'items.slug')
    .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle)
    .joinRelated('category')
    .where('is_item', true)
    .modify('catName', 'items', language)
    .select('items.cat_id', 'size', 'sell_price', 'is_reorder', 'is_remake', 'is_trade', 'is_event')
    .orderBy('name.name')
    .withGraphFetched('[variations, shop(locale, currency, selection), recipes(recipeLocale, recipeInfo).materials(matLocale, info), used_in(usedLocale, usedInfo)]')
    .modifiers({
      locale (builder) {
        builder.modify('nameOnly', 'shop_names', 'name.shop_id', 'shops.id', language);
      },
      matLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'item_id', 'items.id', language);
      },
      recipeLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'item_id', 'recipes.final_item_id', language);
      },
      usedLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'item_id', 'recipes.final_item_id', language);
      },
      selection (builder) {
        builder.select('price', 'slug', 'shop_items.shop_id');
      },
      info (builder) {
        builder.select('mat_id', 'qty', 'order');
      },
      recipeInfo (builder) {
        builder.select('recipe_item_id', 'final_item_id');
      },
      usedInfo (builder) {
        builder.select('recipe_items.recipe_id', 'qty');
      },
      currency (builder) {
        builder.modify('currencyName', 'shop_items', language);
      },
    }).orderByRaw('lower(name.name)');

  if (items) {
    ctx.set('Cache-Control', 'max-age=3600');
    ctx.status = 200;
    ctx.body = { items };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any items.',
    };
  }
}

async function listCatItems (ctx) {
  const { language, subtitle } = ctx.state;
  const id = ctx.params.id;

  const items = await Item.query()
    .select('items.id', 'items.slug')
    .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle)
    .joinRelated('category')
    .where('is_item', true).andWhere('items.cat_id', id)
    .modify('catName', 'items', language)
    .select('items.cat_id', 'size', 'sell_price', 'is_reorder', 'is_remake', 'is_trade', 'is_event')
    .withGraphFetched('[variations, shop(locale, currency, selection), recipes(recipeLocale, recipeInfo).materials(matLocale, info), used_in(usedLocale, usedInfo)]')
    .modifiers({
      locale (builder) {
        builder.modify('nameOnly', 'shop_names', 'name.shop_id', 'shops.id', language);
      },
      matLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'item_id', 'items.id', language);
      },
      recipeLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'item_id', 'recipes.final_item_id', language);
      },
      usedLocale (builder) {
        builder.modify('nameOnly', 'item_names', 'item_id', 'recipes.final_item_id', language);
      },
      selection (builder) {
        builder.select('price', 'slug', 'shop_items.shop_id');
      },
      info (builder) {
        builder.select('mat_id', 'qty', 'order');
      },
      recipeInfo (builder) {
        builder.select('recipe_item_id', 'final_item_id');
      },
      usedInfo (builder) {
        builder.select('recipe_items.recipe_id', 'qty');
      },
      currency (builder) {
        builder.modify('currencyName', 'shop_items', language);
      },
    }).orderByRaw('lower(name.name)');

  if (items) {
    ctx.set('Cache-Control', 'max-age=3600');
    ctx.status = 200;
    ctx.body = { items };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any items.',
    };
  }
}

module.exports = { listItems, listCatItems };
