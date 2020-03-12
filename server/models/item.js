const { BaseModel } = require('./BaseModel');

class Item extends BaseModel {
  static get tableName () {
    return 'items';
  }

  static get relationMappings () {
    const Category = require('./category');

    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'items.cat_id',
          to: 'categories.id',
        },
      },
    };
  }
}

module.exports = Item;
