const router = require('koa-joi-router');
const ctrl = require('../../controllers/user');
const authenticated = require('../../middleware/auth');
const { getParams } = require('../../middleware/getParams');

const user = router();

user.route({
  method: 'post',
  path: '/user/lists',
  validate: {
    type: 'json',
    continueOnError: true,
  },
  handler: [authenticated, ctrl.createList],
});

user.route({
  method: 'patch',
  path: '/user/lists/:id',
  validate: {
    type: 'json',
    continueOnError: true,
  },
  handler: [authenticated, ctrl.editList],
});

user.route({
  method: 'delete',
  path: '/user/lists/:id',
  validate: {
    type: 'json',
    continueOnError: true,
  },
  handler: [authenticated, ctrl.deleteList],
});

user.route({
  method: 'get',
  path: '/user/lists',
  validate: {
    continueOnError: true,
  },
  handler: [authenticated, ctrl.getLists],
});

user.route({
  method: 'get',
  path: '/user/lists/:hashid',
  validate: {
    continueOnError: true,
  },
  handler: [getParams, ctrl.getSingleList],
});

user.route({
  method: 'get',
  path: '/user',
  validate: {
    continueOnError: true,
  },
  handler: [authenticated, ctrl.getUser],
});

user.route({
  method: 'get',
  path: '/user/completion',
  validate: {
    continueOnError: true,
  },
  handler: [getParams, authenticated, ctrl.getCompletionList],
});

// user.route({
//   method: 'get',
//   path: '/user/lists/:id',
//   validate: {
//     type: 'json',
//     continueOnError: true,
//   },
//   handler: ctrl.login,
// });

// user.route({
//   method: 'get',
//   path: '/user',
//   validate: {
//     continueOnError: true,
//   },
//   handler: [authenticated, async (ctx) => {
//     const userid = await ctx.request.jwtPayload.sub;
//     ctx.body = { userid };
//   }],
// });

module.exports = user;
