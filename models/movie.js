const mongoose = require('mongoose');
const validator = require('validator');
const {
  ERROR_INVALID_IMAGE_LINK,
  ERROR_INVALID_TRAILER_LINK,
  ERROR_INVALID_THUMBNAIL_LINK,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: ERROR_INVALID_IMAGE_LINK,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: ERROR_INVALID_TRAILER_LINK,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: ERROR_INVALID_THUMBNAIL_LINK,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
