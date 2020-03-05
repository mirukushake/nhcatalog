const router = require('koa-joi-router');
// const Joi = router.Joi;
const categories = require('./data/categories');
const animals = require('./data/animals');
// const furniture = require('./data/furniture');
const museum = require('./data/museum');

const data = router();

data.use(categories);
data.use(animals);
// data.use(furniture);
data.use(museum);

module.exports = data;
