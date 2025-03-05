const { protect } = require('./authMiddleware');

// Middleware to check if the user has admin privileges
const admin = async (req, res, next) => {
  try {
    // Ensure the user is authenticated and has the admin role
    if (req.user && req.user.isAdmin) {
      return next(); // Continue to the next middleware/route handler
    }

    // If the user is not an admin, send a "Forbidden" error
    res.status(403).json({ message: 'Access restricted to admin resources only' });
  } catch (error) {
    // Error handling
    console.error('Admin verification failed:', error);
    res.status(500).json({ message: 'Server error during admin check' });
  }
};

module.exports = { admin };
