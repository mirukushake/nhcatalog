const Creature = require('../models/creature');

// function getLocale (header) {
//   return header.split(',');
// }

async function listMuseum (ctx) {
  const language = ctx.query.locale || 1;
  const subtitle = ctx.query.subtitle;
  const creatures = await Creature.query()
    .withGraphFetched('[creature, season]')
    .modifyGraph('creature', (builder) => {
      builder.modify('setLocale', 'item_names', 'item_id', 'items', language, subtitle)
        .select('id');
    })
    // .modify('setLocale', 'animal_names', 'animal_id', 'creatures', language, subtitle)
    .select('id', 'item_id');

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
