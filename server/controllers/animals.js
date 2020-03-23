const Animal = require('../models/animal');

async function listAnimals (ctx) {
  const { language, subtitle } = ctx.state;
  const type = ctx.query.type;

  const animals = await Animal.query()
    .skipUndefined()
    .modify('setLocale', 'animal_names', 'animal_id', 'animals.id', language, subtitle)
    .select('animals.id as id', 'animals.slug as slug', 'birthday', 'image_url')
    .modify(function (qb) {
      if (type === 'villager') {
        qb.where('is_npc', false)
          .joinRelated('personalityInfo')
          .joinRelated('speciesInfo')
          .join('personality_names', 'personality_names.personality_id', 'personalityInfo.id').where('personality_names.lang_id', language)
          .join('species_names', 'species_names.species_id', 'speciesInfo.id').where('species_names.lang_id', language)
          .select('personality as personality_id', 'personality_names.name as personality', 'species as species_id', 'species_names.name as species')
          .orderBy('name');
      } else {
        qb.where('is_npc', true);
      }
    });

  if (animals) {
    ctx.set('Cache-Control', 'max-age=3600');
    ctx.status = 200;
    ctx.body = { animals };
  } else {
    ctx.status = 404;
    ctx.body = 'Could not find any animals.';
  }
}

module.exports = { listAnimals };
