const jwt = require('jsonwebtoken');
const { isProduction } = require('./utils');
const { JWT_SECRET_DEV } = require('./constants');

const JWT_SECRET = isProduction() ? process.env.JWT_SECRET : JWT_SECRET_DEV;

const getJwtToken = (id) => jwt.sign({ _id: id }, JWT_SECRET, { expiresIn: '7d' });

const verify = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  getJwtToken,
  verify,
};
