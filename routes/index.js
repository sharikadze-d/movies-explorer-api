const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');

router.use(userRouter);
router.use(movieRouter);
//Добавить обработку страница не найдена

module.exports = router;
