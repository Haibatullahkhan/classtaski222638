// routes/recommendationRoutes.js
const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const validationMiddleware = require('../middleware/validationMiddleware');
const paginationMiddleware = require('../middleware/paginationMiddleware');

// Get personalized movie recommendations for a user
router.get('/personalized', 
    validationMiddleware.validatePagination, 
    paginationMiddleware.applyPagination(),
    recommendationController.getPersonalizedRecommendations
);

// Get movie recommendations based on similar users' activity
router.get('/similar-users', 
    validationMiddleware.validatePagination, 
    paginationMiddleware.applyPagination(),
    recommendationController.getSimilarUsersRecommendations
);

module.exports = router;
