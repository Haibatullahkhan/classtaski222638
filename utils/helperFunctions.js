// utils/helperFunction.js

/**
 * Helper function to format movie data for API response.
 * @param {Object} movie - The movie document to format.
 * @returns {Object} - The formatted movie object with necessary attributes.
 */
exports.formatMovieData = (movie) => {
    return {
        title: movie.title,
        genre: movie.genre,
        director: movie.director,
        cast: movie.cast,
        releaseDate: movie.releaseDate,
        runtime: movie.runtime,
        synopsis: movie.synopsis,
        averageRating: movie.ratings.average,
        movieCoverPhoto: movie.movieCoverPhoto,
        trivia: movie.trivia,
        goofs: movie.goofs,
        soundtrack: movie.soundtrack,
        parentalGuidance: movie.parentalGuidance
    };
};

/**
 * Helper function to validate if a string is a valid ObjectId.
 * @param {String} id - The ID string to validate.
 * @returns {Boolean} - Returns true if the string is a valid ObjectId, otherwise false.
 */
exports.isValidObjectId = (id) => {
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Helper function to handle sorting query parameters for movies.
 * @param {String} sortBy - The field to sort by (e.g., "title", "ratings.average").
 * @param {String} sortOrder - The order to sort by ("asc" or "desc").
 * @returns {Object} - The MongoDB sort object to apply.
 */
exports.getSortQuery = (sortBy = 'title', sortOrder = 'asc') => {
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;
    return sortObj;
};

/**
 * Helper function to filter movies based on search query (e.g., title, genre, director).
 * @param {String} query - The search query string.
 * @returns {Object} - The MongoDB query object for searching movies.
 */
exports.getSearchQuery = (query) => {
    return {
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { genre: { $regex: query, $options: 'i' } },
            { director: { $regex: query, $options: 'i' } },
            { cast: { $regex: query, $options: 'i' } }
        ]
    };
};
