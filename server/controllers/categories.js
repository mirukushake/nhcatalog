const Category = require('../models/category');

async function listCategories (ctx) {
  const { language, subtitle } = ctx.state;
  const flat = ctx.query.flat;

  if (flat && flat === 'true') {
    const categories = await Category.query()
      .modify('setLocale', 'category_names', 'cat_id', 'categories.id', language, subtitle)
      .select('id', 'identifier', 'order');

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
  } else {
    const categories = await Category.query().where('parent', null)
      .modify('setLocale', 'category_names', 'cat_id', 'categories.id', language, subtitle)
      .select('id', 'identifier', 'order')
      .orderBy('order', 'name', 'id', 'identifier', 'subtitle')
      .withGraphFetched('children')
      .modifyGraph('children', (builder) => {
        builder.modify('setLocale', 'category_names', 'cat_id', 'categories.id', language, subtitle)
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
}

module.exports = { listCategories };
