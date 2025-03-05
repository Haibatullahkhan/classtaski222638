// controllers/recommendationController.j
const recommendationService = require('../services/recommendationService');
const paginationHelper = require('../utils/paginationHelper');

// Get personalized movie recommendations for a user
exports.getPersonalizedRecommendations = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user (JWT middleware)
    const { page = 1, limit = 10 } = req.query;

    try {
        // Fetch user preferences (favorite genres, actors, etc.)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get personalized recommendations based on user preferences and activity
        const recommendations = await recommendationService.getRecommendations(user);
        
        // Paginate the recommendations
        const paginatedRecommendations = await paginationHelper.paginate(Movie.find({ _id: { $in: recommendations } }), page, limit);
        
        // Return the paginated recommendations
        res.status(200).json(paginatedRecommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get recommended movies based on similar users' activity
exports.getSimilarUsersRecommendations = async (req, res) => {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    try {
        // Get users with similar activity (e.g., same favorite genres, actors)
        const similarUsers = await recommendationService.getSimilarUsers(userId);
        
        // Fetch movie recommendations based on similar users' activity
        const recommendedMovies = await recommendationService.getMoviesFromSimilarUsers(similarUsers);

        // Paginate the recommended movies
        const paginatedRecommendations = await paginationHelper.paginate(Movie.find({ _id: { $in: recommendedMovies } }), page, limit);
        
        res.status(200).json(paginatedRecommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
