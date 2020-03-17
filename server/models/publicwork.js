const { BaseModel } = require('./BaseModel');

class PublicWorks extends BaseModel {
  static get tableName () {
    return 'public_works';
  }

  static get relationMappings () {
    const Category = require('./category');

    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'public_works.cat_id',
          to: 'categories.id',
        },
      },
    };
  }
}

module.exports = PublicWorks;
