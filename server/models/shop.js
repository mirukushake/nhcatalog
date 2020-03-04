const { BaseModel } = require('./BaseModel');

class Shop extends BaseModel {
  static get tableName () {
    return 'shops';
  }

  static get relationMappings () {
    const Item = require('./item');

    return {
      items: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: Item,
        join: {
          from: 'shops.id',
          through: {
            from: 'shop_items.shop_id',
            to: 'shop_items.item_id',
            extra: ['currency_id', 'price'],
          },
          to: 'items.id',
        },
      },
    };
  }
}

module.exports = Shop;
