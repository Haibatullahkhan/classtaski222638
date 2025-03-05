// middleware/paginationMiddleware.js

/**
 * Middleware to apply pagination to query results.
 * @param {Number} defaultLimit - Default number of items per page.
 * @param {Number} defaultPage - Default page number.
 */
exports.applyPagination = (defaultLimit = 10, defaultPage = 1) => {
    return async (req, res, next) => {
        const { page = defaultPage, limit = defaultLimit } = req.query;

        // Convert page and limit to integers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Store the pagination values in the request object for downstream usage
        req.pagination = {
            page: pageNumber,
            limit: limitNumber,
            skip: (pageNumber - 1) * limitNumber
        };

        next();
    };
};
