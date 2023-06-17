const rateLimiter = require('express-rate-limit');
const { ERROR_LIMITER } = require('../utils/constants');

const limiter = rateLimiter({
  max: 30,
  windowMS: 10000, // 10 seconds
  message: ERROR_LIMITER,
});

module.exports = limiter;
