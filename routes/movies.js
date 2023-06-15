const router = require('express').Router();

const { getMovies, addMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', addMovie);

module.exports = router;
