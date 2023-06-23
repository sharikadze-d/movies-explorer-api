const isProduction = () => process.env.NODE_ENV === 'production';
const NotFoundError = require('../errors/NotFoundError');

const checkAviability = (data, res) => {
  if (!data) {
    throw new NotFoundError('Not Found');
  } else {
    res.send(data);
  }
};

module.exports = {
  isProduction,
  checkAviability,
};
