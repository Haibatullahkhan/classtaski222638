// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes (requires valid JWT token)
const protect = async (req, res, next) => {
  let token;

  // Check for token in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the token's payload
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle invalid or expired token
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    // Handle missing token
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
