const router = require('koa-joi-router');
const Joi = router.Joi;

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  inviteCode: Joi.string().required(),
  businessCat: Joi.any(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const changeListSchema = Joi.object({
  title: Joi.string().required(),
  completion: Joi.boolean().optional(),
});

const completionSchema = Joi.object({
  list: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      count: Joi.number().integer().required(),
      total: Joi.number().integer().required(),
    }),
  ),
  basicList: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      count: Joi.number().integer().required(),
      total: Joi.number().integer().required(),
    }),
  ),
});

module.exports = { registerSchema, loginSchema, changeListSchema, completionSchema };
