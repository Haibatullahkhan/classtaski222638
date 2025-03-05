// controllers/adminController.js
const Movie = require('../models/Movie');

// Function to add a new movie to the database (Admin only)
const addMovie = async (req, res) => {
  try {
    const {
      title,
      genre,
      director,
      cast,
      releaseDate,
      runtime,
      synopsis,
      trivia,
      goofs,
      soundtrack,
      ageRating,
      parentalGuidance
    } = req.body;

    // Create a new movie document
    const movie = await Movie.create({
      title,
      genre,
      director,
      cast,
      releaseDate,
      runtime,
      synopsis,
      trivia,
      goofs,
      soundtrack,
      ageRating,
      parentalGuidance
    });

    // Return the newly created movie data
    res.status(201).json(movie);
  } catch (error) {
    // Error handling
    console.error('Error adding movie:', error);
    res.status(500).json({ message: 'Error adding movie' });
  }
};

module.exports = { addMovie };
