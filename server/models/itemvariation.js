const { BaseModel } = require('./BaseModel');

class ItemVariation extends BaseModel {
  static get tableName () {
    return 'item_variations';
  }
}

module.exports = ItemVariation;
