const { BaseModel } = require('./BaseModel');

class Personality extends BaseModel {
  static get tableName () {
    return 'personalities';
  }
}

module.exports = Personality;
