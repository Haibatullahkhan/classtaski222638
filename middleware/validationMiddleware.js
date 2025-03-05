// middleware/validationMiddleware.js
const { body, query, param, validationResult } = require('express-validator');

// Middleware to validate movie search query parameters
exports.validateMovieSearch = [
    query('q')
        .notEmpty().withMessage('Search query cannot be empty')
        .isString().withMessage('Search query must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware to validate pagination query parameters
exports.validatePagination = [
    query('page')
        .optional().isInt({ min: 1 }).withMessage('Page must be an integer greater than 0'),
    query('limit')
        .optional().isInt({ min: 1 }).withMessage('Limit must be an integer greater than 0'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware to validate user input when adding/updating movies
exports.validateMovieData = [
    body('title').notEmpty().withMessage('Title is required'),
    body('genre').isArray().withMessage('Genre must be an array'),
    body('director').notEmpty().withMessage('Director is required'),
    body('releaseDate').isISO8601().withMessage('Invalid release date'),
    body('runtime').notEmpty().withMessage('Runtime is required'),
    body('synopsis').notEmpty().withMessage('Synopsis is required'),
    body('averageRating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
