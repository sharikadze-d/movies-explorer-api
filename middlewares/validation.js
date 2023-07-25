const { celebrate, Joi } = require('celebrate');

const REGEXP_LINK = /[0-9A-Za-z\-._~:/?#[\]@!$&'()*+,;=]+\.[a-zA-Z]{2,8}[0-9A-Za-z\-._~:/?#[\]@!$&'()*+,;=]*/;

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2),
  }),
});

const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const addMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(REGEXP_LINK),
    trailerLink: Joi.string().required().pattern(REGEXP_LINK),
    thumbnail: Joi.string().required().pattern(REGEXP_LINK),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  userUpdateValidation,
  addMovieValidation,
  deleteMovieValidation,
};
