const mongoose = require('mongoose');

const spellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  spellType: {
    type: String,
    required: true
  },
  spellCaster: {
    type: [String],
    required: true
  },
  castingTime: {
    type: Number,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  spellSave: {
    type: String,
    required: true
  },
  attackType: {
    type: String,
    required: true
  },
  damageType: {
    type: String,
    required: true
  },
  conditions: {
    type: [String],
    required: true
  },
  components: {
    type: [String],
    required: true
  },
  concentration: {
    type: Boolean,
    required: true
  },
  ritual: {
    type: Boolean,
    required: true
  },
  
});

module.exports = mongoose.model('Spell', spellSchema);
