// routes/adminRoutes.js
const express = require('express');
const { addMovie } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Route to add a new movie, accessible only by an admin
router.post('/movie', protect, admin, addMovie);

module.exports = router;
