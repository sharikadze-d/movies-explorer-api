const PORT_DEV = 3000;
const DB_PATH_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_SECRET_DEV = 'devsecret';
const SALT_ROUNDS = 10;

const ERROR_INVALID_EMAIL = 'Некорректный email';
const ERROR_INVALID_IMAGE_LINK = 'Некорректная ссылка на постер';
const ERROR_INVALID_TRAILER_LINK = 'Некорректная ссылка на трейлер';
const ERROR_INVALID_THUMBNAIL_LINK = 'Некорректная ссылка на миниатюру постера';

const ERROR_USER_ALREADY_EXIST = 'Пользователь с таким email уже существует';
const ERROR_USER_VALIDATION = 'Переданы некорректные данные при обновлении профиля.';
const ERROR_USER_NOT_FOUND = 'Пользователь по указанному _id не найден.';
const ERROR_USER_LOGIN = 'Неверный email или пароль';
const ERROR_USER_UNAUTHORIZED = 'Необходима авторизация';

const ERROR_MOVIE_VALIDATION = 'Переданы некорректные данные при добавлении / удалении фильма.';
const ERROR_MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден.';
const ERROR_MOVIE_FORBIDDEN = 'Ошибка доступа.';

const ERROR_SERVER = 'Произошла ошибка на сервере.';
const ERROR_PAGE_NOT_FOUND = 'Страница не найдена';

const ERROR_LIMITER = 'Превышено количество запросов к серверу';

module.exports = {
  PORT_DEV,
  DB_PATH_DEV,
  JWT_SECRET_DEV,
  SALT_ROUNDS,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_IMAGE_LINK,
  ERROR_INVALID_TRAILER_LINK,
  ERROR_INVALID_THUMBNAIL_LINK,
  ERROR_USER_ALREADY_EXIST,
  ERROR_USER_VALIDATION,
  ERROR_USER_NOT_FOUND,
  ERROR_USER_UNAUTHORIZED,
  ERROR_USER_LOGIN,
  ERROR_SERVER,
  ERROR_MOVIE_VALIDATION,
  ERROR_MOVIE_NOT_FOUND,
  ERROR_MOVIE_FORBIDDEN,
  ERROR_LIMITER,
  ERROR_PAGE_NOT_FOUND,
};
