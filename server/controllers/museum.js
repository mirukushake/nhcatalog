const Creature = require('../models/creature');
// const Item = require('../models/item');

async function listCreatures (ctx) {
  const { language, subtitle } = ctx.state;
  const hemisphere = ctx.query.hemi || 'north';

  const creatures = await Creature.query()
    .skipUndefined()
    .modify('setLocale', 'item_names', 'item_id', 'creatures.item_id', language, subtitle)
    .select('id', 'creatures.item_id', 'section', 'order')
    .withGraphFetched('season(hemi)')
    .modifiers({
      hemi (builder) {
        builder.where('hemisphere', hemisphere);
      },
    }).debug();

  if (creatures) {
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
    ctx.status = 200;
    ctx.body = { creatures };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any creatures.',
    };
  }
}

async function listFossils (ctx) {
  // if (fossils.length > 0) {
  //   ctx.status = 200;
  //   ctx.body = {
  //     data: fossils,
  //   };
  // } else {
  //   ctx.status = 404;
  //   ctx.body = {
  //     message: 'Could not find any creatures.',
  //   };
  // }
}

module.exports = { listCreatures, listSingleCreature, listFossils };
