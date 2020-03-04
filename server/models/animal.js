const { BaseModel } = require('./BaseModel');

class Animal extends BaseModel {
  static get tableName () {
    return 'animals';
  }

  static get relationMappings () {
    const Personality = require('./personality');
    const Species = require('./species');
    
    return {
      personalityInfo: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Personality,
        join: {
          from: 'animals.personality',
          to: 'personalities.id' 
        }
      },
      speciesInfo: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Species,
        join: {
          from: 'animals.species',
          to: 'species.id' 
        }
      },
    };
  }
}

module.exports = Animal;
