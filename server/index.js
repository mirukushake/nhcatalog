require('dotenv').config();

const Koa = require('koa');
const { logger } = require('koa2-winston');
const winston = require('winston');
const cors = require('@koa/cors');

// knex config
const Knex = require('knex');
const { Model, snakeCaseMappers } = require('objection');
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig.development);
Model.knex(knex);

// logging config
const transport = new winston.transports.File({ filename: process.env.LOG_FILE });

// routes
const publicRoutes = require('./routes/data');

const app = new Koa();
const PORT = process.env.SERVER_PORT || 8081;

const corsOptions = {
  origin: '*',
};

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.expose = true;
    err.status = err.statusCode || err.status || 500;
    ctx.body = { status: err.status, message: err.message };
    ctx.app.emit('error', err, ctx);
  }
});

app.use(cors(corsOptions));

app.use(publicRoutes.middleware());

app.use(logger({ transports: transport }));

const server = app.listen(PORT);

module.exports = server;
