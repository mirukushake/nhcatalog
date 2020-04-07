const { BaseModel } = require('./BaseModel');

class User extends BaseModel {
  static get tableName () {
    return 'userdata.users';
  }

  static get relationMappings () {
    const List = require('./list');

    return {
      lists: {
        relation: BaseModel.HasManyRelation,
        modelClass: List,
        join: {
          from: 'userdata.users.id',
          to: 'userdata.lists.user_id',
        },
      },
    };
  }
}

module.exports = User;
