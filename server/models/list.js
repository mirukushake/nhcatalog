const { BaseModel } = require('./BaseModel');

class List extends BaseModel {
  static get tableName () {
    return 'userdata.lists';
  }

  static get relationMappings () {
    const ItemVariation = require('./itemvariation');
    const User = require('./user');

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'userdata.lists.user_id',
          to: 'userdata.users.id',
        },
      },
      variations: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: ItemVariation,
        join: {
          from: 'userdata.lists.id',
          through: {
            from: 'userdata.list_items.list_id',
            to: 'userdata.list_items.variation_id',
          },
          to: 'item_variations.id',
        },
      },
    };
  }
}

module.exports = List;
