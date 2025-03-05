const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Import middleware for authentication (assuming it's already created in your project)
const authMiddleware = require('./middleware/authMiddleware'); // Example 

const cors = require('cors'); // For enabling Cross-Origin Resource Sharing

dotenv.config(); // Load environment variables

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Set up routes
app.use('/api/auth', authRoutes);  // Authentication routes (register, login)
app.use('/api/admin', adminRoutes); 
app.use('/api/movie', movieRoutes); 
app.use('/api/review', reviewRoutes);
// Set up new routes
app.use('/api/recommendations', recommendationRoutes);

// If authentication is required for these routes, you can add middleware to protect them
app.use('/api/recommendations', authMiddleware.protect); // Assuming protect middleware checks if the user is authenticated
// Default route for unhandled requests
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Set the server port from environment or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
