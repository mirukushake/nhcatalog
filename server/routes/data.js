const router = require('koa-joi-router');
// const Joi = router.Joi;
const categories = require('./data/categories');
const animals = require('./data/animals');
const items = require('./data/items');
const creatures = require('./data/creatures');
const shops = require('./data/shops');
const recipes = require('./data/recipes');
const works = require('./data/publicworks');

const data = router();

data.use(categories);
data.use(animals);
data.use(items);
data.use(creatures);
data.use(shops);
data.use(recipes);
data.use(works);

module.exports = data;
