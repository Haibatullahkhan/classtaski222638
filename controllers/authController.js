const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    // Validate if required fields are present
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Save the user without hashing the password
    const user = await User.create({
      username,
      email,
      password, // Store the plain-text password directly
      isAdmin: isAdmin || false, // Default to false unless true is provided
    });

    if (user) {
      // Generate JWT token for the new user
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      res.status(201).json({ token, userId: user._id });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user exists and the plain-text password matches
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || user.password !== password) { // Plain-text comparison
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token for the logged-in user
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};

module.exports = { registerUser, loginUser };