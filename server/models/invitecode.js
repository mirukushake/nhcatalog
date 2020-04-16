const { BaseModel } = require('./BaseModel');

class InviteCode extends BaseModel {
  static get tableName () {
    return 'userdata.invitecodes';
  }
}

module.exports = InviteCode;
