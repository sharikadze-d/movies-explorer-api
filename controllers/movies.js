const mongoose = require('mongoose');
const { HTTP_STATUS_CREATED } = require('http2').constants;

const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/SererError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const Movie = require('../models/movie');

const {
  ERROR_MOVIE_VALIDATION,
  ERROR_MOVIE_NOT_FOUND,
  ERROR_MOVIE_FORBIDDEN,
  ERROR_SERVER,
} = require('../utils/constants');

const handleError = (err, next) => {
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    return next(new ValidationError(ERROR_MOVIE_VALIDATION));
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError || err instanceof NotFoundError) {
    return next(new NotFoundError(ERROR_MOVIE_NOT_FOUND));
  }
  if (err instanceof ForbiddenError) {
    return next(new ForbiddenError(ERROR_MOVIE_FORBIDDEN));
  }
  return next(new ServerError(ERROR_SERVER));
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

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return Promise.reject(new NotFoundError(ERROR_MOVIE_NOT_FOUND));
      }
      if (req.user._id !== movie.owner._id.toString()) {
        return Promise.reject(new ForbiddenError(ERROR_MOVIE_FORBIDDEN));
      }
      return movie.deleteOne();
    })
    .then((card) => res.send(card))
    .catch((err) => handleError(err, next));
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
