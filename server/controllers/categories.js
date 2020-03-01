const Category = require('../models/category');

async function listCategories (ctx) {
  const language = ctx.query.locale;
  const subtitle = ctx.query.subtitle;
  const categories = await Category.query().where('parent', null)
    .skipUndefined()
    .joinRelated('names', { alias: 'name' })
    .where('name.lang_id', language)
    .select('categories.*', 'name.name as name')
    .modify(function (qb) {
      if (subtitle) {
        qb.joinRelated('names', { alias: 'subtitle' }).where('subtitle.lang_id', subtitle).select('subtitle.name as subtitle');
      }
    })
    .orderBy('order', 'name', 'id', 'identifier', 'parent', 'subtitle')
    .withGraphFetched('children')
    .modifyGraph('children', (builder) => {
      builder.joinRelated('names', { alias: 'name' })
        .where('name.lang_id', language)
        .select('categories.*', 'name.name as name')
        .modify(function (qb) {
          if (subtitle) {
            qb.joinRelated('names', { alias: 'subtitle' }).where('subtitle.lang_id', subtitle).select('subtitle.name as subtitle');
          }
        })
        .orderBy('order', 'name', 'id', 'identifier', 'parent', 'subtitle');
    });
    // .withGraphFetched('names')
    // .modifyGraph('names', (builder) => {
    //   builder.where('lang_id', language).orWhere('lang_id', subtitle);
    // });
  if (categories) {
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
