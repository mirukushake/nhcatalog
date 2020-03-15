const Animal = require('../models/animal');

async function listVillagers (ctx) {
  const { language, subtitle } = ctx.state;

  const animals = await Animal.query()
    .skipUndefined()
    .joinRelated('personalityInfo')
    .joinRelated('speciesInfo')
    .join('personality_names', 'personality_names.personality_id', 'personalityInfo.id').where('personality_names.lang_id', language)
    .join('species_names', 'species_names.species_id', 'speciesInfo.id').where('species_names.lang_id', language)
    .modify('setLocale', 'animal_names', 'animal_id', 'animals.id', language, subtitle)
    .select('animals.id as id', 'animals.identifier as identifier', 'personality as personality_id', 'personality_names.name as personality', 'birthday', 'species as species_id', 'species_names.name as species')
    .whereNot('is_npc', true);

  if (animals) {
    ctx.status = 200;
    ctx.body = { data: animals };
  } else {
    ctx.status = 404;
    ctx.body = 'Could not find any animals.';
  }
}

async function listSPCharacters (ctx) {
  const { language, subtitle } = ctx.state;

  const animals = await Animal.query()
    .skipUndefined()
    .modify('setLocale', 'animal_names', 'animal_id', 'animals.id', language, subtitle)
    .where('is_npc', true)
    .select('id', 'identifier', 'birthday');

  if (animals) {
    ctx.status = 200;
    ctx.body = { data: animals };
  } else {
    ctx.status = 404;
    ctx.body = 'Could not find any animals.';
  }
}

module.exports = { listVillagers, listSPCharacters };
