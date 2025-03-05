// services/recommendationService.js
const Movie = require('../models/movieModel');
const User = require('../models/userModel');

// Fetching recommendations for the user based on preferences and ratings
exports.getRecommendations = async (userId) => {
    try {
        // Find the user's preferences
        const user = await User.findById(userId).populate('preferences.genres').exec();

        // Get the user's preferred genres
        const favoriteGenres = user.preferences.genres;
        
        // Fetch recommended movies based on user's preferred genres
        const recommendations = await Movie.find({ genre: { $in: favoriteGenres } })
            .limit(10)  // Limit the number of recommended movies
            .exec();

        return recommendations;
    } catch (error) {
        throw new Error('Error fetching recommendations: ' + error.message);
    }
};

// Fetch similar movies based on a specific movie's genre or director
exports.getSimilarMovies = async (movieId) => {
    try {
        // Find the movie to get its genre or director for similarity
        const movie = await Movie.findById(movieId).exec();

        if (!movie) {
            throw new Error('Movie not found');
        }

        // Fetch movies from the same genre or same director
        const similarMovies = await Movie.find({
            $or: [
                { genre: { $in: movie.genre } },
                { director: movie.director }
            ]
        }).limit(5).exec();

        return similarMovies;
    } catch (error) {
        throw new Error('Error fetching similar movies: ' + error.message);
    }
};
