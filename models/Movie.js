// models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  runtime: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  trivia: {
    type: [String],
    default: [],
  },
  goofs: {
    type: [String],
    default: [],
  },
  soundtrack: {
    type: [String],
    default: [],
  },
  ageRating: {
    type: String,
    required: true,
  },
  parentalGuidance: {
    type: String,
    default: '',
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  movieCoverPhoto: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Movie', movieSchema);
