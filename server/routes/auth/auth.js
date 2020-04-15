const router = require('koa-joi-router');
const ctrl = require('../../controllers/auth');
const schema = require('../../schemas/users');
const authenticated = require('../../middleware/auth');

const auth = router();

auth.route({
  method: 'post',
  path: '/auth/register',
  validate: {
    type: 'json',
    body: schema.registerSchema,
    continueOnError: true,
  },
  handler: ctrl.register,
});

auth.route({
  method: 'post',
  path: '/auth/login',
  validate: {
    type: 'json',
    body: schema.loginSchema,
    continueOnError: true,
  },
  handler: ctrl.login,
});

auth.route({
  method: 'patch',
  path: '/auth/changepassword',
  validate: {
    type: 'json',
    continueOnError: true,
  },
  handler: [authenticated, ctrl.changePassword],
});

module.exports = auth;
