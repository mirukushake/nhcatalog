require('dotenv').config();

const Koa = require('koa');
const logger = require('koa-bunyan-logger');
const bunyan = require('bunyan');
const cors = require('@koa/cors');
const { LoggingBunyan } = require('@google-cloud/logging-bunyan');

// knex config
const Knex = require('knex');
const { Model } = require('objection');

const knexConfig = require('./knexfile');

const knex = Knex(knexConfig.development);
Model.knex(knex);

// routes
const publicRoutes = require('./routes/routes');

const app = new Koa();
const PORT = process.env.SERVER_PORT || 8080;

const corsOptions = {
  origin: process.env.SITE_URL,
};

// logging config
const loggingBunyan = new LoggingBunyan();

const prodLogger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Stackdriver Logging
  // will contain "name": "my-service"
  name: 'nhcatalog',
  streams: [
    // Log to the console at 'info' and above
    { stream: process.stdout, level: 'info' },
    // And log to Stackdriver Logging, logging at 'info' and above
    loggingBunyan.stream('info'),
  ],
});

if (process.env.NODE_ENV !== 'local') {
  app.use(logger(prodLogger));

  app.use(logger.requestIdContext());
  app.use(logger.requestLogger());
}
app.use(cors(corsOptions));

app.use(publicRoutes.middleware());

const server = app.listen(PORT);

module.exports = server;
