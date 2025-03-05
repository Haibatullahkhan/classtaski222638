// utils/paginationHelper.js

/**
 * Helper function to implement pagination for database queries.
 * @param {Object} query - The MongoDB query object.
 * @param {Number} page - The page number (default is 1).
 * @param {Number} limit - The number of items per page (default is 10).
 * @returns {Object} - The paginated result containing the items and pagination metadata.
 */
exports.paginate = async (query, page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;

        // Get the total count of items matching the query
        const totalCount = await query.countDocuments();

        // Fetch the items for the current page
        const items = await query.skip(skip).limit(limit).exec();

        return {
            items,
            page,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            hasNextPage: page < Math.ceil(totalCount / limit),
            hasPrevPage: page > 1
        };
    } catch (error) {
        throw new Error('Error in pagination: ' + error.message);
    }
};
