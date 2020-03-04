const Category = require('../models/category');

// function getLocale (header) {
//   return header.split(',');
// }

// list of all categories

async function listCategories (ctx) {
  const language = ctx.query.locale || 1;
  const subtitle = ctx.query.subtitle;
  const categories = await Category.query().where('parent', null)
    .modify('setLocale', 'category_names', 'cat_id', 'categories', language, subtitle)
    .select('id', 'identifier', 'order')
    .orderBy('order', 'name', 'id', 'identifier', 'subtitle')
    .withGraphFetched('children')
    .modifyGraph('children', (builder) => {
      builder.modify('setLocale', 'category_names', 'cat_id', 'categories', language, subtitle)
        .select('id', 'identifier', 'order')
        .orderBy('order', 'name', 'id', 'identifier', 'subtitle');
    });

  if (categories.length > 0) {
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: categories,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Could not find any categories.',
    };
  }
}

module.exports = { listCategories };
