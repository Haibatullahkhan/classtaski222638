const express = require('express');
const { getMovies } = require('../controllers/movieController');

const router = express.Router();

// Route to get a list of all movies
router.get('/', getMovies);  // Changed to root ('/')

module.exports = router;
