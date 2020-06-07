const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  characterClass: {
    type: String,
    required: true
  },
  characterRace: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('Character', characterSchema);
