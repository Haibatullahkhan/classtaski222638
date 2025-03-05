const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection options for Mongoose 6+
const dbOptions = {
  // The following options are no longer necessary in Mongoose v6 and later
  // useNewUrlParser: true,      // No longer needed
  // useUnifiedTopology: true,   // No longer needed
  // useCreateIndex: true,       // No longer needed
  // useFindAndModify: false     // No longer needed
};

// Create a function to establish a MongoDB connection
const connectDB = async () => {
  try {
    // Connecting to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, dbOptions);
    console.log('MongoDB connected successfully');
  } catch (error) {
    // Log error message in case of connection failure
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

// Set MongoDB event listeners for better error handling and monitoring
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Export the connectDB function for use in other files
module.exports = connectDB;
