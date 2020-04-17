const Item = require('../models/item');
// const Shop = require('../models/shop');
// const Recipe = require('../models/recipe');

async function search (ctx) {
  const { language, subtitle } = ctx.state;
  const string = decodeURIComponent(ctx.request.query.q);

  try {
    const items = await Item.query()
      .where('name.name', 'like', `%${string}%`)
      .andWhere('category.is_menu', true)
      .joinRelated('category')
      .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle)
      .modify('catName', 'items', language)
      .select('category.slug')
      .orderByRaw('lower(name.name) collate "ja-x-icu"');

    // const recipes = await Recipe.query()
    // .where('name.name', 'like', `%${string}%`)
    // .modify('setLocale', 'item_names', 'item_id', 'final_item_id', language, subtitle)
    // .joinRelated('product')
    // .select('slug')
    // .orderByRaw('lower(name.name)');

    // const shops = await Shop.query()
    // .where('name.name', 'like', `%${string}%`)
    // .modify('setLocale', 'shop_names', 'shop_id', 'shops.id', language, subtitle)
    // .select('slug')
    // .orderByRaw('lower(name.name)');

    ctx.status = 200;
    ctx.body = { results: items };
  } catch (err) {
    ctx.throw(500, err.message);
  }
}

module.exports = { search };
