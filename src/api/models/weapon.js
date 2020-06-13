const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  weaponType: {
    type: String,
    required: true
  },
  weaponSkill: {
    type: String,
    required: true
  },
  damageDie: {
    type: Number,
    required: true
  },
  damageDieCount: {
    type: Number,
    required: true
  },
  damageType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  handCount: {
    type: Number,
    required: true
  },
  properties: {
    type: [String],
    required: true
  },
  rangeMin: {
    type: Number,
    required: false
  },
  rangeMax: {
    type: Number,
    required: false
  },
  requiresAmmunition: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Weapon', weaponSchema);
