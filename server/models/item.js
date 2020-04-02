const { BaseModel } = require('./BaseModel');

class Item extends BaseModel {
  static get tableName () {
    return 'items';
  }

  static get relationMappings () {
    const Category = require('./category');
    const Shop = require('./shop');
    const Recipe = require('./recipe');
    const ItemVariation = require('./itemvariation');

    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'items.cat_id',
          to: 'categories.id',
        },
      },
      variations: {
        relation: BaseModel.HasManyRelation,
        modelClass: ItemVariation,
        join: {
          from: 'items.id',
          to: 'item_variations.item_id',
        },
      },
      shop: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Shop,
        join: {
          from: 'items.id',
          through: {
            from: 'shop_items.item_id',
            to: 'shop_items.shop_id',
            extra: ['currency_id', 'price'],
          },
          to: 'shops.id',
        },
      },
      recipes: {
        relation: BaseModel.HasManyRelation,
        modelClass: Recipe,
        join: {
          from: 'items.id',
          to: 'recipes.final_item_id',
        },
      },
      used_in: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Recipe,
        join: {
          from: 'items.id',
          through: {
            from: 'recipe_items.mat_id',
            to: 'recipe_items.recipe_id',
            extra: ['qty'],
          },
          to: 'recipes.id',
        },
      },
    };
  }
}

module.exports = Item;
