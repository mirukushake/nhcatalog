const Item = require('../models/item')
const Category = require('../models/category')

// list all clothing
async function listClothing (ctx) {
  const { language, subtitle } = ctx.state;

  const clothing = await Item.query()
    .select('items.id', 'items.identifier')
    .modify('setLocale', 'item_names', 'item_id', 'items', language, subtitle)
    .joinRelated('category')
    .join('category_names', 'category_names.cat_id', 'category.id').where('category_names.lang_id', language)
    .select('items.cat_id', 'category_names.name as cat_name', 'category.identifier as cat_identifier', 'size', 'sell_price')
    .where('category.parent', 35).orWhere('category.id', 35)


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

  const idCheck = await Category.query().where('parent', 35).orWhere('id', 35).select('id');

  const idArray = idCheck.map(i => i.id)

  const clothing = await Item.query()
    .select('items.id', 'items.identifier')
    .modify('setLocale', 'item_names', 'item_id', 'items', language, subtitle)
    .joinRelated('category')
    .join('category_names', 'category_names.cat_id', 'category.id').where('category_names.lang_id', language)
    .select('items.cat_id', 'category_names.name as cat_name', 'category.identifier as cat_identifier', 'size', 'sell_price')
    .whereIn('category.id', idArray).andWhere('category.id', cat)

  if (clothing.length > 0) {
    ctx.status = 200;
    ctx.body = {
      data: clothing,
    };
  }
  else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any clothing, or this is not a clothing category.',
    };
  }
}


module.exports = { listClothing, singleListClothing };
