const Creature = require('../models/creature');

// function getLocale (header) {
//   return header.split(',');
// }

async function listMuseum (ctx) {
  const language = ctx.query.locale || 1;
  const subtitle = ctx.query.subtitle;
  const creatures = await Creature.query()
    // .withGraphFetched('[personalityInfo as personality, speciesInfo as species]')
    // .modify('setLocale', 'animal_names', 'animal_id', 'creatures', language, subtitle)
    .select('id', 'identifier');

  if (creatures.length > 0) {
    ctx.status = 200;
    ctx.body = {
      status: 'success',
      data: creatures,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Could not find any creatures.',
    };
  }
}

module.exports = { listMuseum };
