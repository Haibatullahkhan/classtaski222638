// services/trendingService.js
const Movie = require('../models/movieModel');

// Get trending movies (sorted by average rating or recent user activity)
exports.getTrendingMovies = async () => {
    try {
        // Get the top 10 trending movies based on average rating
        const trendingMovies = await Movie.find()
            .sort({ 'ratings.average': -1 })  // Sort by average rating in descending order
            .limit(10)  // Limit to top 10 movies
            .exec();

        return trendingMovies;
    } catch (error) {
        throw new Error('Error fetching trending movies: ' + error.message);
    }
};

// Get trending movies by user activity (e.g., views, ratings)
exports.getTrendingByActivity = async () => {
    try {
        const trendingMovies = await Movie.find()
            .sort({ 'userActivity.views': -1 })  // Sort by user views in descending order
            .limit(10)  // Limit to top 10 trending movies
            .exec();

        return trendingMovies;
    } catch (error) {
        throw new Error('Error fetching trending movies by activity: ' + error.message);
    }
};
