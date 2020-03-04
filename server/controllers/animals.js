const Animal = require('../models/animal');

// function getLocale (header) {
//   return header.split(',');
// }

async function listAnimals (ctx) {
  const language = ctx.query.locale || 1;
  const subtitle = ctx.query.subtitle;
  const animals = await Animal.query()
  .withGraphFetched('[personalityInfo as personality, speciesInfo as species]')
  .modifyGraph('personality', (builder) => {
      builder.modify('setLocale', 'personality_names', 'personality_id', 'personalities', language, subtitle)
        .select('id')
    })
  .modifyGraph('species', (builder) => {
      builder.modify('setLocale', 'species_name', 'species_id', 'species', language, subtitle)
        .select('id')
    })
  .modify('setLocale', 'animal_names', 'animal_id', 'animals', language, subtitle)
  .select('id', 'identifier', 'personality', 'is_npc', 'birthday', 'species');
  
  if (animals.length > 0) {
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: animals,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Could not find any animals.',
    };
  }
}

module.exports = { listAnimals };