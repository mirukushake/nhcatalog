require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
const User = require('../models/user');
const InviteCode = require('../models/invitecode');

const secret = process.env.SECRET;

async function register (ctx) {
  try {
    const regex = /^[a-zA-Z0-9!@#$%^&*]{6,30}$/;
    const password = ctx.request.body.password;
    const username = ctx.request.body.username;
    const code = ctx.request.body.inviteCode;
    const usernameCheck = await User.query().findOne({ username });
    const codeCheck = await InviteCode.query().findOne({ code, user_id: null });

    if (ctx.request.body.businessCat != null) {
      ctx.throw(403, 'Probably a bot');
    }

    if (!codeCheck || codeCheck.length > 0) {
      ctx.throw(422, 'Invite code is already used or invalid.');
    }

    if (usernameCheck) {
      ctx.throw(409, 'That username already exists.');
    }

    if (!regex.test(password)) {
      ctx.throw(422, 'Invalid password.');
    }

    const hashedPasword = bcrypt.hashSync(password, salt);
    const userInfo = { username, passwordhash: hashedPasword, role: 3 };
    const newUser = await User.query().insert(userInfo).returning('*');
    await InviteCode.query().update({ user_id: newUser.id }).where({ code });

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

async function changePassword (ctx) {
  try {
    const regex = /^[a-zA-Z0-9!@#$%^&*]{6,30}$/;
    const id = await ctx.request.jwtPayload.sub;
    const { password } = ctx.request.body;

    if (!password) { ctx.throw(422, 'Password required.'); }

    if (!regex.test(password)) {
      ctx.throw(422, 'Invalid password.');
    }

    const hashedPasword = bcrypt.hashSync(password, salt);

    const updatedPassword = await User.query().findById(id).patch({ passwordhash: hashedPasword }).returning('*');

    if (updatedPassword) {
      ctx.status = 200;
    }
  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

module.exports = { register, login, changePassword };
