const router = require('koa-joi-router');
// const Joi = router.Joi;
const categories = require('./public/categories');

const data = router();

data.use(categories);

module.exports = data;
