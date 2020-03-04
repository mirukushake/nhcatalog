const router = require('koa-joi-router');
// const Joi = router.Joi;
const categories = require('./public/categories');
const animals = require('./public/animals');

const data = router();

data.use(categories);
data.use(animals);

module.exports = data;
