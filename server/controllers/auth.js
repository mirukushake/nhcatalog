require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
const User = require('../models/user');

const secret = process.env.SECRET;

async function register (ctx) {
  try {
    const password = ctx.request.body.password;
    const hashedPasword = bcrypt.hashSync(password, salt);
    const userInfo = { username: ctx.request.body.username, passwordhash: hashedPasword, role: 3 };
    const newUser = await User.query().insert(userInfo);

    ctx.status = 201;
    ctx.body = { username: newUser.username };
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

async function login (ctx) {
  try {
    const { username, password } = ctx.request.body;

    if (!username) { ctx.throw(422, 'Username required.'); }
    if (!password) { ctx.throw(422, 'Password required.'); }

    const user = await User.query().findOne({ username });

    if (!user) { ctx.throw(401, 'Wrong username or password'); }

    if (await bcrypt.compareSync(password, user.passwordhash)) {
      const payload = { sub: user.id };
      const token = jwt.sign(payload, secret);

      ctx.body = { token, user: user.id };
    } else {
      ctx.throw(401, 'Wrong username or password');
    }
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

module.exports = { register, login };
