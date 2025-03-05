// controllers/movieController.js
const Movie = require('../models/Movie');

// Fetch all movies from the database
const getMovies = async (req, res) => {
  try {
    // Implement pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get movies with pagination
    const movies = await Movie.find().skip(skip).limit(limit);

    // Count total movies for pagination info
    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);

    // Return the list of movies with pagination data
    res.json({
      page,
      totalPages,
      totalMovies,
      movies
    });
  } catch (error) {
    // Error handling
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Error fetching movies' });
  }
};
const paginationHelper = require('../utils/paginationHelper');
const helperFunction = require('../utils/helperFunctions');

// Get paginated list of movies
exports.getMovies = async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'title', sortOrder = 'asc' } = req.query;
    
    try {
        // Create the sort query
        const sortQuery = helperFunction.getSortQuery(sortBy, sortOrder);
        
        // Fetch paginated movies
        const movieQuery = Movie.find().sort(sortQuery);
        const paginatedResult = await paginationHelper.paginate(movieQuery, page, limit);

        // Return the paginated result
        res.status(200).json(paginatedResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search for movies
exports.searchMovies = async (req, res) => {
    const query = req.query.q;
    
    try {
        const searchQuery = helperFunction.getSearchQuery(query);
        const movies = await Movie.find(searchQuery);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMovies };
