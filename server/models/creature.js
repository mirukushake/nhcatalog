const { BaseModel } = require('./BaseModel');

class Creature extends BaseModel {
  static get tableName () {
    return 'creatures';
  }

  static get relationMappings () {
    const Item = require('./item');
    const CreatureSeasonality = require('./creatureseasonality');

    return {
      creature: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'creatures.item_id',
          to: 'items.id',
        },
      },

      season: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: CreatureSeasonality,
        join: {
          from: 'creatures.id',
          to: 'creature_seasonality.creature_id',
        },
      },
    };
  }
}

module.exports = Creature;
