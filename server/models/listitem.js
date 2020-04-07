const { BaseModel } = require('./BaseModel');

class ListItem extends BaseModel {
  static get tableName () {
    return 'userdata.list_items';
  }

  static get idColumn () {
    return ['list_id', 'variation_id'];
  }

  // static get relationMappings () {
  //   const Item = require('./item');

  //   return {
  //     item: {
  //       relation: BaseModel.BelongsToOneRelation,
  //       modelClass: Item,
  //       join: {
  //         from: 'item_variations.item_id',
  //         to: 'items.id',
  //       },
  //     },
  //   };
  // }
}

module.exports = ListItem;
