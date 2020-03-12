const Creature = require('../models/creature');

async function listCreatures (ctx) {
  const { language, subtitle, sort, order, page, size, search } = ctx.state;

  const creatures = await Creature.query()
    .skipUndefined()
    .joinRelated('creature')
    .join('item_names', 'item_names.item_id', 'creature.id').where('item_names.lang_id', language)
    .select('creatures.id', 'creatures.item_id as item_id', 'item_names.name as name')
    .select('identifier', 'section', 'order', 'cat_id')
    .withGraphFetched('season');

  if (creatures) {
    ctx.status = 200;
    ctx.body = {
      data: creatures,
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any creatures.',
    };
  }
}

async function listFossils(ctx) {
  //
}

module.exports = { listCreatures };
