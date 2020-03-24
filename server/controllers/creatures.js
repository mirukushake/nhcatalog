const Creature = require('../models/creature');
// const Item = require('../models/item');

async function listCreatures (ctx) {
  const { language, subtitle } = ctx.state;
  const hemisphere = ctx.query.hemi || 'north';

  const creatures = await Creature.query()
    .skipUndefined()
    .modify('setLocale', 'item_names', 'item_id', 'creatures.item_id', language, subtitle)
    .select('id', 'creatures.item_id', 'section', 'order')
    // add location to select later
    .withGraphFetched('season(hemi)')
    .modifiers({
      hemi (builder) {
        builder.where('hemisphere', hemisphere);
      },
    });

  if (creatures) {
    ctx.set('Cache-Control', 'max-age=3600');
    ctx.status = 200;
    ctx.body = { creatures };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any creatures.',
    };
  }
}

async function listSingleCreature (ctx) {
  const { language, subtitle } = ctx.state;
  const id = ctx.params.id;
  const hemisphere = ctx.query.hemi || 'north';

  const creatures = await Creature.query()
    .skipUndefined()
    .modify('setLocale', 'item_names', 'item_id', 'creatures.item_id', language, subtitle)
    .joinRelated('creature(type)')
    .select('creatures.id', 'creatures.item_id', 'section', 'order', 'cat_id')
    // add location to select later
    .withGraphFetched('season(hemi)')
    .modifiers({
      hemi (builder) {
        builder.where('hemisphere', hemisphere);
      },
      type (builder) {
        builder.where('cat_id', id);
      },
    });

  if (creatures) {
    ctx.set('Cache-Control', 'max-age=3600');
    ctx.status = 200;
    ctx.body = { creatures };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any creatures.',
    };
  }
}

module.exports = { listCreatures, listSingleCreature };
