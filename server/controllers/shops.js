const Shop = require('../models/shop');
const Item = require('../models/item')

// list all shops (name only)
async function listShops (ctx) {
  const { language, subtitle } = ctx.state;

  const shops = await Shop.query()
    .modify('setLocale', 'shop_names', 'shop_id', 'shops.id', language, subtitle)
    .select('id', 'slug', 'is_unlock');

  if (shops) {
    ctx.status = 200;
    ctx.body = { shops };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any shops.',
    };
  }
}

// list all items in a shop
async function singleShop (ctx) {
   const { language, subtitle, sort, order, page, size, search } = ctx.state;
   const shopId = ctx.params.id;

   const shop = await Shop.query()
    .findById(shopId)
    .modify('setLocale', 'shop_names', 'shop_id', 'shops.id', language, subtitle)
    .select('id', 'slug')
    .withGraphFetched('items(locale, currency, selection, category)')
    .modifiers({
      locale(builder) {
        builder.modify('setLocale', 'item_names', 'shop_items.item_id', 'name.item_id', language, subtitle);
      },
      selection(builder) {
        builder.select('items.id', 'slug', 'price', 'sell_price', 'items.cat_id');
      },
      category(builder) {
        builder.modify('catName', 'items', language);
      },
      currency(builder) {
        builder.modify('currencyName', 'shop_items', language);
      },
    });

  if (shop) {
    ctx.status = 200;
    ctx.body = {
      data: shop,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find this shop.',
    };
  }
}

module.exports = { listShops, singleShop };
