const router = require('express').Router();

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { addMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', addMovieValidation, addMovie);
router.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
