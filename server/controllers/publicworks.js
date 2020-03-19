const Work = require('../models/publicwork');
const Category = require('../models/category');

// list all public works
async function listWorks (ctx) {
  const { language, subtitle } = ctx.state;

  const works = await Work.query()
    .modify('setLocale', 'public_work_names', 'work_id', 'public_works.id', language, subtitle)
    .select('slug', 'cat_id', 'is_unlock', 'price')
    .modify('currencyName', 'public_works', language);

  if (works.length > 0) {
    ctx.status = 200;
    ctx.body = {
      data: works,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any public works.',
    };
  }
}

// list single public work type
async function singleListWork (ctx) {
  const { language, subtitle } = ctx.state;
  const cat = ctx.params.id;

const works = await Work.query()
    .modify('setLocale', 'public_work_names', 'work_id', 'public_works.id', language, subtitle)
    .select('slug', 'cat_id', 'is_unlock', 'price')
    .modify('currencyName', 'public_works', language)
    .where('cat_id', cat);

  if (works.length > 0) {
    ctx.status = 200;
    ctx.body = {
      data: clothing,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any public works.',
    };
  }
}

module.exports = { listWorks, singleListWork };
