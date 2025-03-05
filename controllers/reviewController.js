const Review = require('../models/Review');
const Movie = require('../models/Movie');

// Add a review to a movie
const addReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;
    const userId = req.user.id;

    // Check if the movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Create a new review
    const review = await Review.create({ userId, movieId, rating, comment });

    // Update movie's average rating
    const reviews = await Review.find({ movieId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    movie.averageRating = avgRating;
    await movie.save();

    // Return the new review
    res.status(201).json(review);
  } catch (error) {
    // Error handling
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Error adding review' });
  }
};

// Get reviews for a specific movie
const getReviews = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Find reviews by movie ID
    const reviews = await Review.find({ movieId }).populate('userId', 'username');

    // Return reviews
    res.json(reviews);
  } catch (error) {
    // Error handling
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

// Update a review by ID
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    // Find the review by ID
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update review details
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    // Return the updated review
    res.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating review' });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the review by ID
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Return success message
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Error deleting review' });
  }
};

module.exports = { addReview, getReviews, updateReview, deleteReview };
