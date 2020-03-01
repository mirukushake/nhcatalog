const { Model } = require('objection');
// const path = require('path');

class Category extends Model {
  static get tableName () {
    return 'categories';
  }

  static get relationMappings () {
    const CategoryNames = require('./category_names');

    return {
      names: {
        relation: Model.HasManyRelation,
        modelClass: CategoryNames,
        join: {
          from: 'categories.id',
          to: 'category_names.cat_id',
        },
      },

      children: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: 'categories.id',
          to: 'categories.parent',
        },
      },
    };
  }
}

module.exports = Category;
