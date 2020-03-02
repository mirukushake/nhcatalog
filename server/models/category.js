const { BaseModel } = require('./BaseModel');

class Category extends BaseModel {
  static get tableName () {
    return 'categories';
  }

  static get relationMappings () {

    return {
      children: {
        relation: BaseModel.HasManyRelation,
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
