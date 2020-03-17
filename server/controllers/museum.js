const Creature = require('../models/creature');
// const Item = require('../models/item');

async function listCreatures (ctx) {
  const { language, subtitle } = ctx.state;
  const hemisphere = ctx.query.hemi || 'north';

  const creatures = await Creature.query()
    .skipUndefined()
    .modify('setLocale', 'item_names', 'creatures.item_id', 'name.item_id', language, subtitle)
    .select('id', 'creatures.item_id', 'section', 'order')
    .withGraphFetched('season(hemi)')
    .modifiers({
      locale (builder) {
        builder.modify('setLocale', 'item_names', 'items.id', 'name.item_id', language, subtitle);
      },
      hemi (builder) {
        builder.where('hemisphere', hemisphere);
      },
    });

  if (creatures.length > 0) {
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

async function listSingleCreature (ctx) {
  const { language, subtitle } = ctx.state;
  const id = ctx.params.id;
  const hemisphere = ctx.query.hemi || 'north';

  const creatures = await Creature.query()
    .skipUndefined()
    .modify('setLocale', 'item_names', 'creatures.item_id', 'name.item_id', language, subtitle)
    .joinRelated('creature')
    .select('creatures.id', 'creatures.item_id', 'section', 'order', 'cat_id')
    .where('cat_id', id)
    .withGraphFetched('season(hemi)')
    .modifiers({
      locale (builder) {
        builder.modify('setLocale', 'item_names', 'items.id', 'name.item_id', language, subtitle);
      },
      hemi (builder) {
        builder.where('hemisphere', hemisphere);
      },
    });

  if (creatures.length > 0) {
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
