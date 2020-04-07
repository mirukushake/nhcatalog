const Item = require('../models/item');

async function search (ctx) {
  const { language, subtitle } = ctx.state;
  const string = decodeURIComponent(ctx.request.query.q);

  try {
    const results = await Item.query()
      .where('name.name', 'like', `%${string}%`)
      .andWhere('category.is_menu', true)
      .joinRelated('category')
      .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle)
      .modify('catName', 'items', language)
      .select('category.slug');
    if (results) {
      ctx.status = 200;
      ctx.body = { results };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'Could not find any items.',
      };
    }
  } catch (err) {
    ctx.throw(500, err.message);
  }
}

module.exports = { search };
