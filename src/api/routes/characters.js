const express = require('express');
const router = express.Router();
const Character = require('../models/character');

router.get('/', async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getCharacter,(req, res) => {
  res.json(res.character);
});

router.post('/add', async (req, res) => {
  const character = new Character({
    name: req.body.name,
    characterClass: req.body.characterClass,
    characterRace: req.body.characterRace,
    level: req.body.level
  });

  try {
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/edit/:id', getCharacter, async (req, res) => {
  if(req.body.name != null) {
    res.character.name = req.body.name;
  }
  if(req.body.characterClass != null) {
    res.character.characterClass = req.body.characterClass;
  }
  if(req.body.characterRace != null) {
    res.character.characterRace = req.body.characterRace;
  }
  if(req.body.level != null) {
    res.character.level = req.body.level;
  }

  try {
    const updatedCharacter = await res.character.save();
    res.json(updatedCharacter);
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/delete/:id', getCharacter, async (req, res) => {
  try {
    await res.character.remove();
    res.json({ message: 'Deleted Character' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCharacter(req, res, next) {
  let character;
  try {
    character = await Character.findById(req.params.id);
    if(character === null) {
      return res.status(404).json({ message: 'Cannot find Character' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.character = character;
  next();
}

module.exports = router;
