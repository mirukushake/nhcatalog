const { raw } = require('objection');
const Creature = require('../models/creature');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc)

async function listCreatures (ctx) {
  const { language, subtitle } = ctx.state;
  const hemisphere = ctx.query.hemi || 'north';

  const creatures = await Creature.query()
    .skipUndefined()
    .modify('setLocale', 'item_names', 'item_id', 'creatures.item_id', language, subtitle)
    .joinRelated('creature')
    .select('creatures.id', 'creatures.item_id', 'section', 'order', 'sell_price', 'is_allday')
    .select(raw('start_time::time, end_time::time'))
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
    .select('creatures.id', 'creatures.item_id', 'section', 'order', 'sell_price', 'is_allday')
    .select(raw('start_time::time, end_time::time'))
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

async function listCreaturesByDate (ctx) {
  const { language, subtitle } = ctx.state;
  const hemisphere = ctx.query.hemi || 'north';

  // get current month and time
  const current = dayjs.utc();
  const currentTime = current.local().format('HH:00:00');
  const currentMonth = current.local().format('M');

  // get ids of current creatures
  const creatures = await Creature.query()
    .with('times', (qb) => {
    qb.select(raw('id, generate_series(start_time, end_time, \'1 hour\')::time as hours')).from('creatures')
    })
    .select('creatures.id')
    .leftJoin('times', 'times.id', 'creatures.id')
    .joinRelated('season')
    .whereRaw(`(is_allday = true OR hours = '${currentTime}')`)
    .andWhereRaw(`(${currentMonth}=ANY(seasons) OR is_allyear = TRUE)`)
    .andWhere('hemisphere', hemisphere)
    .groupBy('creatures.id');

  const idsOnly = creatures.map(x => x.id);

  // put info in usual format
  const creaturesFinal = await Creature.query()
    .skipUndefined()
    .modify('setLocale', 'item_names', 'item_id', 'creatures.item_id', language, subtitle)
    .select('creatures.id', 'creatures.item_id', 'section', 'order', 'sell_price', 'is_allday')
    .select(raw('start_time::time, end_time::time'))
    .joinRelated('creature')
    .modify('catName', 'creature', language)
    // add location to select later
    .withGraphFetched('season(hemi)')
    .whereIn('creatures.id', idsOnly)
    .orderBy('name')
    .modifiers({
      hemi (builder) {
        builder.where('hemisphere', hemisphere);
      },
    });

  if (creaturesFinal) {
    ctx.status = 200;
    ctx.body = { creatures: creaturesFinal };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: 'Could not find any creatures.',
    };
  }
}

module.exports = { listCreatures, listSingleCreature, listCreaturesByDate };
