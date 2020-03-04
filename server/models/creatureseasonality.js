const { BaseModel } = require('./BaseModel');

class CreatureSeasonality extends BaseModel {
  static get tableName () {
    return 'creature_seasonality';
  }
}

module.exports = CreatureSeasonality;
