const Item = require('../models/item');

// list all materials
async function listMaterials (ctx) {
  const { language, subtitle } = ctx.state;

  const materials = await Item.query()
    .select('items.id', 'items.identifier')
    .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle)
    .joinRelated('category')
    .join('category_names', 'category_names.cat_id', 'category.id').where('category_names.lang_id', language)
    .select('items.cat_id', 'category_names.name as cat_name', 'category.identifier as cat_identifier', 'size', 'sell_price')
    .where('items.cat_id', 51)
    .withGraphFetched('[shop(locale, currency, selection), recipes.materials(matLocale, info), used_in(usedLocale, usedInfo)]')
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
      usedInfo (builder) {
        builder.select('recipe_items.recipe_id', 'qty');
      },
      currency (builder) {
        builder.modify('currencyName', 'shop_items', language);
      },
    });

  if (materials) {
    ctx.status = 200;
    ctx.body = {
      data: materials,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any materials.',
    };
  }
}

module.exports = { listMaterials };
