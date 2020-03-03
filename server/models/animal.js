const { BaseModel } = require('./BaseModel');

class Animal extends BaseModel {
  static get tableName () {
    return 'animals';
  }

  static get relationMappings () {

    return {
			
    };
  }
}

module.exports = Animal;
