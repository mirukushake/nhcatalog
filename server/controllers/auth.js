async function login (ctx) {
  try {

  } catch (err) {
    ctx.status = err.status || err.statusCode || 500;
    ctx.body = { message: err.message };
  }
}

module.exports = { login };
