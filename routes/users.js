const router = require('express').Router();

const { getUserData, updateProfile } = require('../controllers/users');
const { userUpdateValidation } = require('../middlewares/validation');

router.get('/users/me', getUserData);
router.patch('/users/me', userUpdateValidation, updateProfile);

module.exports = router;
