const { BaseModel } = require('./BaseModel');

class Item extends BaseModel {
  static get tableName () {
    return 'items';
  }

  static get relationMappings () {
  }
}

module.exports = Item;
