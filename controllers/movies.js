const { HTTP_STATUS_CREATED } = require('http2').constants;

const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/SererError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const Movie = require('../models/movie');
// const { checkAviability } = require('../utils/utils');
const {
  ERROR_MOVIE_VALIDATION,
  ERROR_MOVIE_NOT_FOUND,
  ERROR_MOVIE_FORBIDDEN,
  ERROR_SERVER,
} = require('../utils/constants');

const handleError = (err, next) => {
  (function switchError() {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return Promise.reject(new ValidationError(ERROR_MOVIE_VALIDATION));
    }
    if (err.name === 'NotFoundError') {
      return Promise.reject(new NotFoundError(ERROR_MOVIE_NOT_FOUND));
    }
    if (err.name === 'ForbiddenError') {
      return Promise.reject(new ForbiddenError(ERROR_MOVIE_FORBIDDEN));
    }
    return Promise.reject(new ServerError(ERROR_SERVER));
  }())
    .catch(next);
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => handleError(err, next));
};

const addMovie = (req, res, next) => {
  const owner = req.user._id;
  const movieData = req.body;
  const trailerLink = req.body.trailer;
  Movie.create({ ...movieData, trailerLink, owner })
    .then((movie) => res.status(HTTP_STATUS_CREATED).send(movie))
    .catch((err) => handleError(err, next));
};

module.exports = {
  getMovies,
  addMovie,
};
