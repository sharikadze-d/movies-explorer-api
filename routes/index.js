const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');
const { ERROR_PAGE_NOT_FOUND } = require('../utils/constants');

router.use(userRouter);
router.use(movieRouter);
router.use('/*', () => { throw new NotFoundError(ERROR_PAGE_NOT_FOUND); });

module.exports = router;
