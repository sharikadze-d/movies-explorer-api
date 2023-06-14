const PORT_DEV = 3000;
const DB_PATH_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb';

const ERROR_INVALID_EMAIL = 'Некорректный email';
const ERROR_INVALID_IMAGE_LINK = 'Некорректная ссылка на постер';
const ERROR_INVALID_TRAILER_LINK = 'Некорректная ссылка на трейлер';
const ERROR_INVALID_THUMBNAIL_LINK = 'Некорректная ссылка на миниатюру постера';

module.exports = {
  PORT_DEV,
  DB_PATH_DEV,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_IMAGE_LINK,
  ERROR_INVALID_TRAILER_LINK,
  ERROR_INVALID_THUMBNAIL_LINK,
};
