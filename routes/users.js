const router = require('express').Router();

const { getUserData } = require('../controllers/users');

router.get('/users/me', getUserData);

module.exports = router;
