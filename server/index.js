require('dotenv').config();

const Koa = require('koa');
const logger = require('koa-bunyan-logger');
const cors = require('@koa/cors');

// knex config
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig.development);
Model.knex(knex);

// logging config

// routes
const publicRoutes = require('./routes/data');

const app = new Koa();
const PORT = process.env.SERVER_PORT || 8081;

const corsOptions = {
  origin: '*',
};
app.use(logger({
  streams: [{
    level: 'info',
    path: process.env.LOG_FILE,
  }],
}));
app.use(logger.requestIdContext());
app.use(logger.requestLogger());

app.use(cors(corsOptions));

app.use(publicRoutes.middleware());

const server = app.listen(PORT);

module.exports = server;
