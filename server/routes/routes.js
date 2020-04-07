const router = require('koa-joi-router');
// const Joi = router.Joi;
const categories = require('./data/categories');
const animals = require('./data/animals');
const items = require('./data/items');
const creatures = require('./data/creatures');
const shops = require('./data/shops');
const recipes = require('./data/recipes');
const works = require('./data/publicworks');
const auth = require('./auth/auth');
const user = require('./user/user');
const search = require('./data/search');

const routes = router();

// data routes
routes.use(categories);
routes.use(animals);
routes.use(items);
routes.use(creatures);
routes.use(shops);
routes.use(recipes);
routes.use(works);
routes.use(search);

// auth routes
routes.use(auth);

// user routes
routes.use(user);

module.exports = routes;
