const Animal = require('../models/animal');
const Language = require('../models/language');

async function listVillagers (ctx) {
  const lang = await Language.query().where('code', '=', ctx.query.locale).select('id');
  const subtitle = ctx.query.subtitle;
  const sort = ctx.query['sortBy[]'];
  const order = ctx.query['sortDesc[]'];
  const page = (ctx.query.page - 1) || 0;
  const size = ctx.query.size || 20;
  const search = ctx.query.search;

  const language = lang[0].id || 1;

  const animals = await Animal.query()
    .skipUndefined()
    .joinRelated('personalityInfo')
    .joinRelated('speciesInfo')
    .join('personality_names', 'personality_names.personality_id', 'personalityInfo.id').where('personality_names.lang_id', language)
    .join('species_names', 'species_names.species_id', 'speciesInfo.id').where('species_names.lang_id', language)
    .modify('setLocale', 'animal_names', 'animal_id', 'animals', language, subtitle)
    .modify(function (qb) {
      if (search) {
        qb.where('name', 'ilike', `%${search}%`);
      }
      if (sort && order) {
        const orderString = (order === 'false') ? 'asc' : 'desc';
        qb.orderBy(sort, orderString);
      }
    })
    .select('animals.id as id', 'animals.identifier as identifier', 'personality as personality_id', 'personality_names.name as personality', 'birthday', 'species as species_id', 'species_names.name as species')
    .page(page, size);

  if (animals) {
    ctx.status = 200;
    ctx.body = { data: animals };
  } else {
    ctx.status = 404;
    ctx.body = 'Could not find any animals.';
  }
}

async function listSPCharacters (ctx) {
  const lang = await Language.query().where('code', '=', ctx.query.locale).select('id');
  const subtitle = ctx.query.subtitle;
  const sort = ctx.query['sortBy[]'];
  const order = ctx.query['sortDesc[]'];
  const page = (ctx.query.page - 1) || 0;
  const size = ctx.query.size || 20;
  const search = ctx.query.search;

  const language = lang[0].id || 1;

  const animals = await Animal.query()
    .skipUndefined()
    .modify('setLocale', 'animal_names', 'animal_id', 'animals', language, subtitle)
    .where('is_npc', true)
    .modify(function (qb) {
      if (search) {
        qb.where('name', 'ilike', `%${search}%`);
      }
      if (sort && order) {
        const orderString = (order === 'false') ? 'asc' : 'desc';
        qb.orderBy(sort, orderString);
      }
    })
    .select('id', 'identifier', 'birthday')
    .page(page, size);

  if (animals) {
    ctx.status = 200;
    ctx.body = { data: animals };
  } else {
    ctx.status = 404;
    ctx.body = 'Could not find any animals.';
  }
}

module.exports = { listVillagers, listSPCharacters };
