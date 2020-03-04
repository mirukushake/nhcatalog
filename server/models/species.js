const { BaseModel } = require('./BaseModel');

class Species extends BaseModel {
  static get tableName () {
    return 'species';
  }
}

module.exports = Species;
