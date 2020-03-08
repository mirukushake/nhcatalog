const Animal = require('../models/animal');
const Language = require('../models/language');

async function listAnimals (ctx) {
  const lang = await Language.query().where('code', '=', ctx.query.locale).select('id');
  const subtitle = ctx.query.subtitle;
  const sort = ctx.query['sortBy[]'];
  const page = (ctx.query.page - 1) || 0;
  const size = ctx.query.size || 20;
  const search = ctx.query.search;

  const language = lang[0].id || 1;

  const animals = await Animal.query()
    .skipUndefined()
    .withGraphFetched('[personalityInfo as personality, speciesInfo as species]')
    .modifyGraph('personality', (builder) => {
      builder.modify('setLocale', 'personality_names', 'personality_id', 'personalities', language, subtitle)
        .select('id');
    })
    .modifyGraph('species', (builder) => {
      builder.modify('setLocale', 'species_names', 'species_id', 'species', language, subtitle)
        .select('id');
    })
    .modify('setLocale', 'animal_names', 'animal_id', 'animals', language, subtitle)
    .modify(function (qb) {
      if (search) {
        qb.where('name', 'ilike', `%${search}%`);
      }
    })
    .select('id', 'identifier', 'personality', 'is_npc', 'birthday', 'species')
    .page(page, size);

  if (animals) {
    ctx.status = 200;
    ctx.body = { data: animals };
  } else {
    ctx.status = 404;
    ctx.body = 'Could not find any animals.';
  }
}

module.exports = { listAnimals };
