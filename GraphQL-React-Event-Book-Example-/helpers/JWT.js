const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

module.exports.verify = token => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    throw new Error('jwt token not verified');
  }
};

module.exports.generateToken = user => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
    secret
  );
};
