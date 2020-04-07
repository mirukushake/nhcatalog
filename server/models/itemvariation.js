const { BaseModel } = require('./BaseModel');

class ItemVariation extends BaseModel {
  static get tableName () {
    return 'item_variations';
  }

  static get relationMappings () {
    const Item = require('./item');

    return {
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'item_variations.item_id',
          to: 'items.id',
        },
      },
    };
  }
}

module.exports = ItemVariation;
