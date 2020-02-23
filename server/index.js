require('dotenv').config();

const Koa = require('koa');
const logger = require('koa-pino-logger');
const cors = require('@koa/cors');

// knex config
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig.development);
Model.knex(knex);

// routes
// const allRoutes = require('./routes/index');

const app = new Koa();
const PORT = 8081;

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

// app
//   .use(allRoutes.routes())
//   .use(allRoutes.allowedMethods());

app.use(logger());

app.use((ctx) => {
  ctx.body = 'hello world'
  throw Error('bang!')
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
