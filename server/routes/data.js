const router = require('koa-joi-router');
// const Joi = router.Joi;
const categories = require('./data/categories');
const animals = require('./data/animals');
// const furniture = require('./data/furniture');
const museum = require('./data/museum');
const shops = require('./data/shops');
const recipes = require('./data/recipes');
const clothing = require('./data/clothing');
const collectibles = require('./data/collectibles');
const materials = require('./data/materials');

const data = router();

data.use(categories);
data.use(animals);
// data.use(furniture);
data.use(museum);
data.use(shops);
data.use(recipes);
data.use(clothing);
data.use(collectibles);
data.use(materials);

module.exports = data;
