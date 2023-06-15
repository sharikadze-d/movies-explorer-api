const router = require('express').Router();

const { getUserData, updateProfile } = require('../controllers/users');

router.get('/users/me', getUserData);
router.patch('/users/me', updateProfile);

module.exports = router;
