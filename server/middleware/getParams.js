const Language = require('../models/language');

const getParams = async (ctx, next) => {
  try {

    const lang = await Language.query().skipUndefined().where('code', '=', ctx.query.locale).select('id');
    const sub = await Language.query().skipUndefined().where('code', '=', ctx.query.subtitle).select('id');

    const language = (lang.length > 1) ? 1 : lang[0].id;
    const subtitle = (sub.length > 1) ? null : sub[0].id;

    ctx.state.language = language;
    ctx.state.subtitle = subtitle;

    await next(ctx);
  } catch (err) {
    ctx.throw(500, err.message);
  }
};

module.exports = { getParams };
