const express = require('express');
const { addReview, updateReview, deleteReview, getReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to add a review, protected by authentication
router.post('/review', protect, addReview);

// Route to update a review, protected by authentication
router.put('/review/:id', protect, updateReview);

// Route to delete a review, protected by authentication
router.delete('/review/:id', protect, deleteReview);

// Route to get all reviews for a specific movie
router.get('/reviews/:movieId', getReviews);

module.exports = router;
