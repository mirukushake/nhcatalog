const router = require('koa-joi-router');
const Joi = router.Joi;

const languageParam = Joi.any().valid('en', 'ja');

module.exports = { languageParam };
