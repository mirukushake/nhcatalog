const { Model, raw } = require('objection');

class BaseModel extends Model {
  static get modelPaths () {
    return [__dirname];
  }

  static get modifiers () {
    return {
      setLocale (builder, jointable, joincol, origin, language, subtitle) {
        builder.skipUndefined().joinRaw(`join ${jointable} as name on ${origin} = name.${joincol} and name.lang_id = ${language}`)
          .select(raw(`coalesce(name.name, (select name.name from ${jointable} where ${joincol} = ${origin} and lang_id = ${language})) as name`))
          .modify(function (qb) {
            if (subtitle) {
              qb.leftJoin(`${jointable} as subtitle`, `subtitle.${joincol}`, `${origin}`)
                .where('subtitle.lang_id', subtitle)
                .select('subtitle.name as subtitle');
            }
          });
      },
      catName (builder, table, language) {
        builder.skipUndefined().join('category_names as catname', `${table}.cat_id`, 'catname.cat_id')
          .where('catname.lang_id', language)
          .select('catname.name as cat_name');
      },
      currencyName (builder, table, language) {
        builder.skipUndefined().join('currency_names as currencyname', `${table}.currency_id`, 'currencyname.currency_id')
          .where('currencyname.lang_id', language)
          .select('currencyname.plural as currency_name', 'currencyname.currency_id');
      },
      nameOnly (builder, jointable, joincol, origin, language) {
        builder.join(`${jointable} as name`, joincol, origin)
          .where('name.lang_id', language)
          .select('name.name as name');
      },
    };
  }
}

module.exports = {
  BaseModel,
};
