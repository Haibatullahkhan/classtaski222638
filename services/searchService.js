// services/searchService.js
const Movie = require('../models/movieModel');

// Search movies based on title, genre, director, or actors
exports.searchMovies = async (query) => {
    try {
        // Search the database based on multiple fields (title, genre, director, actor)
        const searchResults = await Movie.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } },
                { director: { $regex: query, $options: 'i' } },
                { cast: { $regex: query, $options: 'i' } }
            ]
        }).exec();

        return searchResults;
    } catch (error) {
        throw new Error('Error searching movies: ' + error.message);
    }
};
