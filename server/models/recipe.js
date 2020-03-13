const { BaseModel } = require('./BaseModel');

class Recipe extends BaseModel {
  static get tableName () {
    return 'recipes';
  }

  static get relationMappings () {
    const Item = require('./item');

    return {
      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'recipes.final_item_id',
          to: 'items.id',
        },
      },
      recipe: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'recipes.recipe_id',
          to: 'items.id',
        },
      },
      materials: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Item,
        join: {
          from: 'recipes.id',
          through: {
            from: 'recipe_items.recipe_id',
            to: 'recipe_items.mat_id',
            extra: ['qty', 'order'],
          },
          to: 'items.id',
        },
      },
    };
  }
}

module.exports = Recipe;
