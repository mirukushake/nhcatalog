const router = require('koa-joi-router');
const ctrl = require('../../controllers/auth');
const authenticated = require('../../middleware/auth');

const auth = router();

auth.route({
  method: 'post',
  path: '/auth/register',
  validate: {
    type: 'json',
    continueOnError: true,
  },
  handler: ctrl.register,
});

auth.route({
  method: 'post',
  path: '/auth/login',
  validate: {
    type: 'json',
    continueOnError: true,
  },
  handler: ctrl.login,
});

auth.route({
  method: 'get',
  path: '/userinfo',
  validate: {
    continueOnError: true,
  },
  handler: [authenticated, async (ctx) => {
    const userid = await ctx.request.jwtPayload.sub;
    ctx.body = { userid };
  }],
});

module.exports = auth;
