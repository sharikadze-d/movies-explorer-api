const { verify } = require('../utils/jwt');
const UnauthorizedError = require('../errors/UnauthoriedError');

const { ERROR_USER_UNAUTHORIZED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(ERROR_USER_UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = verify(token);
  } catch (err) {
    throw new UnauthorizedError(ERROR_USER_UNAUTHORIZED);
  }

  req.user = payload;

  next();
};
