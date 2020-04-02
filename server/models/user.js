const { BaseModel } = require('./BaseModel');

class User extends BaseModel {
  static get tableName () {
    return 'userdata.users';
  }
}

module.exports = User;
