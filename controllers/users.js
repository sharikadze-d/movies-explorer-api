const bcrypt = require('bcrypt');
const { HTTP_STATUS_CREATED } = require('http2').constants;

const User = require('../models/user');
const { checkAviability } = require('../utils/utils');
const { getJwtToken } = require('../utils/jwt');

const NotFoundError = require('../errors/NotFoundError');
const AlreadyExistError = require('../errors/AlreadyExistError');
const ServerError = require('../errors/SererError');
const ValidationError = require('../errors/ValidationError');
const UnauthorizedError = require('../errors/UnauthoriedError');

const {
  SALT_ROUNDS,
  ERROR_USER_ALREADY_EXIST,
  ERROR_USER_VALIDATION,
  ERROR_USER_NOT_FOUND,
  ERROR_SERVER,
  ERROR_USER_LOGIN,
} = require('../utils/constants');

const handleError = (err, next) => {
  (function switchError() {
    if (err.code === 11000) {
      return Promise.reject(new AlreadyExistError(ERROR_USER_ALREADY_EXIST));
    }
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return Promise.reject(new ValidationError(ERROR_USER_VALIDATION));
    }
    if (err.name === 'NotFoundError') {
      return Promise.reject(new NotFoundError(ERROR_USER_NOT_FOUND));
    }
    return Promise.reject(new ServerError(ERROR_SERVER));
  }())
    .catch(next);
};

const createUser = (req, res, next) => {
  const userData = req.body;
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => User.create({ ...userData, password: hash }))
    .then((user) => user.toObject({ useProjection: true }))
    .then((noPassUser) => res.status(HTTP_STATUS_CREATED).send(noPassUser))
    .catch((err) => handleError(err, next));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError(ERROR_USER_LOGIN);
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(ERROR_USER_LOGIN);
          }
          res.send({ jwt: getJwtToken(user._id) });
        })
        .catch(next);
    })
    .catch(next);
};

const getUserData = (req, res) => {
  User.findById(req.user._id)
    .then((user) => checkAviability(user, res))
    .catch((err) => handleError(err, res));
};

const updateProfile = (req, res, next) => {
  const userData = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, userData, { new: true, runValidators: true })
    .then((user) => checkAviability(user, res))
    .catch((err) => handleError(err, next));
};

module.exports = {
  getUserData,
  createUser,
  login,
  updateProfile,
};
