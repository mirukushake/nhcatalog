const { BaseModel } = require('./BaseModel');

class Language extends BaseModel {
  static get tableName () {
    return 'languages';
  }
}

module.exports = Language;
