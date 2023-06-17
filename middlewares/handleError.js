const { ERROR_SERVER } = require('../utils/constants');

function handleError(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? ERROR_SERVER : err.message;
  res.status(statusCode).send({ message });

  next();
}

module.exports = handleError;
