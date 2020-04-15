/* eslint-disable camelcase */

// const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const { raw } = require('objection');

const { _, map, groupBy, pick, sumBy } = require('lodash');

const User = require('../models/user');
const List = require('../models/list');
const ListItem = require('../models/listitem');

async function getUser (ctx) {
  try {
    const userid = await ctx.request.jwtPayload.sub;

    const userInfo = await User.query().findById(userid).select('id', 'username', 'site_settings').withGraphFetched('lists(order)').modifiers({
      order: (builder) => {
        builder.orderBy('title');
      },
    });

    if (userInfo) {
      ctx.status = 200;
      ctx.body = { user: userInfo };
    } else {
      ctx.throw(404, 'User does not exist.');
    }
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

async function createList (ctx) {
  try {
    const userid = await ctx.request.jwtPayload.sub;
    const title = await ctx.request.body.title;
    const completion = await ctx.request.body.completion;
    const hashid = shortid.generate();

    const newList = await List.query().insert({ hashid, user_id: userid, title, completion }).returning('*');

    if (newList) {
      ctx.status = 201;
    } else {
      ctx.throw(409, 'The list could not be created');
    }
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

async function getLists (ctx) {
  try {
    const userid = await ctx.request.jwtPayload.sub;

    const allLists = await List.query().where({ user_id: userid }).orderBy('title');

    if (allLists) {
      ctx.status = 200;
      ctx.body = { lists: allLists };
    } else {
      ctx.throw(404, 'Could not find any lists for this user.');
    }
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

async function editList (ctx) {
  try {
    if ('items' in ctx.request.body) {
      const listid = ctx.request.body.listid;
      const items = ctx.request.body.items;

      const oldItems = await ListItem.query().where('list_id', listid).select('variation_id');

      const ids = oldItems.map(i => i.variation_id);

      const newIds = items.filter(val => !ids.includes(val));

      const added = await List.relatedQuery('variations').for(listid).relate(newIds);

      if (added) {
        ctx.status = 200;
        ctx.body = { added };
      }
    } else {
      const userid = await ctx.request.jwtPayload.sub;
      const title = ctx.request.body.title;
      const listid = ctx.request.params.id;

      const updatedList = await List.query().skipUndefined()
        .where('id', listid)
        .andWhere('user_id', userid)
        .patch({ title }).returning('*');

      if (updatedList) {
        ctx.status = 200;
      } else {
        ctx.throw(409, 'The list could not be updated.');
      }
    }
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

async function getSingleList (ctx) {
  try {
    const { language, subtitle } = ctx.state;
    const hashid = ctx.params.hashid;

    const listItems = await List.query()
      .where('hashid', hashid)
      .joinRelated('user')
      .select('lists.id as list_id', 'lists.*', 'username')
      .withGraphFetched('variations(joinItem)')
      .modifiers({
        joinItem (builder) {
          builder.joinRelated('item')
            .select('item_variations.*')
            .modify('catName', 'item', language)
            .modify('setLocale', 'item_names', 'item_id', 'item_variations.item_id', language, subtitle).orderBy('name');
        },
      });

    if (!listItems) {
      ctx.throw(404, 'List does not exist.');
    }

    const items = groupBy(listItems[0].variations, 'item_id');
    const result = map(items, (item) => {
      const { item_id, name, subtitle, cat_name } = item[0];
      const variations = map(item, variation => pick(variation, ['id', 'image_url', 'color_id']));
      return { item_id, name, subtitle, cat_name, variations };
    });

    listItems[0].variations = result;

    if (listItems) {
      ctx.status = 200;
      ctx.body = { list: listItems };
    } else {
      ctx.throw(404, 'Could not find any lists for this user.');
    }
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

async function getCompletionList (ctx) {
  try {
    const { language, subtitle } = ctx.state;
    const userid = await ctx.request.jwtPayload.sub;

    const checkComplete = await List.query().where('user_id', userid).andWhere('completion', true);

    const listItems = await List.query()
      .with('total_count', (qb) => {
        qb.select('items.id')
          .count('item_variations as total_count')
          .from('items')
          .leftJoin('item_variations', 'item_id', 'items.id')
          .groupBy('items.id');
      })
      .with('completed', (qb) => {
        qb.select('items.id')
          .count('variation_id as count')
          .from('userdata.list_items')
          .join('item_variations', 'variation_id', 'item_variations.id')
          .join('items', 'item_id', 'items.id')
          .join('total_count', 'items.id', 'total_count.id')
          .where('list_id', checkComplete[0].id)
          .groupBy('items.id');
      }).select('items.id', 'slug', 'cat_id', 'completed.id as completed_id')
      .select(raw('coalesce(count, count, 0)::int4 as count, total_count.total_count::int4, coalesce(round((count * 100.0) / total_count.total_count, 1)::int4, 0) as percent'))
      .from('items')
      .whereNotIn('cat_id', [18, 20, 29, 30, 31, 32])
      .leftJoin('completed', 'completed.id', 'items.id')
      .leftJoin('total_count', 'items.id', 'total_count.id')
      .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle)
      .whereNot('total_count.total_count', 0).orderBy('name');

    const basicListItems = await List.query()
      .with('completed', (qb) => {
        qb.select(raw('items.id, case when count(variation_id) > 0 then 1 end as count'))
          .from('userdata.list_items')
          .join('item_variations', 'variation_id', 'item_variations.id')
          .join('items', 'item_id', 'items.id')
          .where('list_id', checkComplete[0].id)
          .groupBy('items.id');
      }).select('items.id', 'slug', 'cat_id', 'completed.id as completed_id')
      .select(raw('items.id, slug, cat_id, coalesce(count, count, 0)::int4 as count, 1 as total'))
      .from('items')
      .whereNotIn('cat_id', [18, 20, 29, 30, 31, 32])
      .leftJoin('completed', 'completed.id', 'items.id')
      .modify('setLocale', 'item_names', 'item_id', 'items.id', language, subtitle).orderBy('name');

    if (!listItems || !basicListItems) {
      ctx.throw(404, 'List does not exist.');
    }

    const grouped = _(listItems).groupBy('cat_id').map((objs, key) => ({
      id: key,
      count: sumBy(objs, 'count'),
      total: sumBy(objs, 'total_count'),
    })).value();

    const basicGrouped = _(basicListItems).groupBy('cat_id').map((objs, key) => ({
      id: key,
      count: sumBy(objs, 'count'),
      total: sumBy(objs, 'total'),
    })).value();

    if (listItems) {
      ctx.status = 200;
      ctx.body = { list: grouped, basicList: basicGrouped };
    } else {
      ctx.throw(404, 'Could not find any lists for this user.');
    }
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

async function deleteList (ctx) {
  try {
    if (ctx.request.body) {
      const listid = ctx.request.body.deletedItems.listid;
      const items = ctx.request.body.deletedItems.items;

      const deleted = await List.relatedQuery('variations').for(listid).unrelate().whereIn('variation_id', items);

      if (deleted) {
        ctx.status = 200;
        ctx.body = { deleted };
      }
    } else {
      const userid = await ctx.request.jwtPayload.sub;
      const listid = ctx.request.params.id;

      const deletedList = await List.query().skipUndefined()
        .delete()
        .where('id', listid)
        .andWhere('user_id', userid);

      if (deletedList) {
        ctx.status = 204;
      } else {
        ctx.throw(409, 'The list could not be deleted.');
      }
    }
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

module.exports = { getUser, createList, getLists, editList, getSingleList, getCompletionList, deleteList };
