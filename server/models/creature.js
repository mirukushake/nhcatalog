const { BaseModel } = require('./BaseModel');

class Creature extends BaseModel {
  static get tableName () {
    return 'creatures';
  }

  static get relationMappings () {
    const Item = require('./item');
    // const CreatureSeasonality = require('./creatureseasonality');

    return {
      item: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'creatures.item_id',
          to: 'items.id',
        },
      },

      // creature_seasonality
    };
  }
}

module.exports = Creature;
