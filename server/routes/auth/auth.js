const router = require('koa-joi-router');
// const schema = require('../../schemas/animals');
const ctrl = require('../../controllers/auth');
// const { getParams } = require('../../middleware/getParams');

const auth = router();

auth.route({
  method: 'post',
  path: '/login',
  validate: {
    continueOnError: true,
  },
  handler: ctrl.login,
});

module.exports = auth;
