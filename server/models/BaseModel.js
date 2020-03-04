const { Model } = require('objection');

class BaseModel extends Model {
  static get modelPaths () {
    return [__dirname];
  }

  static get modifiers () {
    return {
      setLocale (builder, jointable, joincol, origin, language, subtitle) {
        builder.skipUndefined().join(`${jointable} as name`, joincol, `${origin}.id`)
          .where('name.lang_id', language)
          .select('name.name as name')
          .modify(function (qb) {
            if (subtitle) {
              qb.join(`${jointable} as subtitle`, `subtitle.${joincol}`, `${origin}.id`).where('subtitle.lang_id', subtitle).select('subtitle.name as subtitle');
            }
          });
      },
    };
  }
}

module.exports = {
  BaseModel,
};
