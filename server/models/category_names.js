const { Model } = require('objection');
// const path = require('path');

class CategoryNames extends Model {
  static get tableName () {
    return 'category_names';
  }
}

module.exports = CategoryNames;
