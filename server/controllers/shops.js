const Shop = require('../models/shop');
const Item = require('../models/item')

// list all shops (name only)
async function listShops (ctx) {
  const { language, subtitle, sort, order, page, size, search } = ctx.state;

  const shops = await Shop.query()
    .modify('setLocale', 'shop_names', 'shop_id', 'shops', language, subtitle)
    .select('id', 'identifier', 'is_unlock', 'unlock_method');

  if (shops) {
    ctx.status = 200;
    ctx.body = {
      data: shops,
    };
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
    .modify('setLocale', 'shop_names', 'shop_id', 'shops', language, subtitle)
    .select('id', 'identifier', 'is_unlock', 'unlock_method')
    .withGraphFetched('items(locale, currencyName, selection, catName)')
    .modifiers({
      locale(builder) {
        builder.modify('joinLocale', 'item_names', 'shop_items.item_id', language, subtitle);
      },
      selection(builder) {
        builder.select('shop_items.currency_id', 'identifier', 'price', 'sell_price', 'items.cat_id');
      },
      catName(builder) {
        builder.skipUndefined().join('category_names as catname', 'items.cat_id', 'catname.cat_id')
          .where('catname.lang_id', language)
          .select('catname.name as cat_name')
      },
      currencyName(builder) {
        builder.skipUndefined().join('currency_names as currencyname', 'shop_items.currency_id', 'currencyname.currency_id')
          .where('currencyname.lang_id', language)
          .select('currencyname.plural as currency_name')
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
