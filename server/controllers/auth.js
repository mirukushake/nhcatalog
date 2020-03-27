const firebase = require('../config/firebase');

async function login (ctx) {
try {
  const email = 'hajimaruyo@gmail.com';
  const password = 'abc1234';
  const user = await firebase.auth().signInWithEmailAndPassword(email, password);

  ctx.status = 200;
  ctx.body = { user };

} catch(err) {
  ctx.status = err.status || err.statusCode || 500;
  ctx.body = { message: err.message };
}
}

module.exports = { login };
