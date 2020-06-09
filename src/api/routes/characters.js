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
  console.log(res.character);
  res.json(res.character);
});

router.post('/add', async (req, res) => {
  console.log(req.body);
  const character = new Character({
    name: req.body.name,
    characterClass: req.body.characterClass,
    characterRace: req.body.characterRace,
    level: req.body.level,
    initiative: req.body.initiative,
    xp: req.body.xp,
    subRace: req.body.subRace,
    subClass: req.body.subClass,
    armorClass: req.body.armorClass,
    hitDiceTotal: req.body.hitDiceTotal,
    hitDieSize: req.body.hitDieSize,
    hitPointMaximum: req.body.hitPointMaximum,
    currentHitPoints: req.body.currentHitPoints,
    temporaryHitPoints: req.body.temporaryHitPoints,
    abilityScores: {
      strength: req.body.StrengthAS,
      dexterity: req.body.DexterityAS,
      constitution: req.body.ConstitutionAS,
      intelligence: req.body.IntelligenceAS,
      wisdom: req.body.WisdomAS,
      charisma: req.body.CharismaAS
    },
    abilityModifiers: {
      strength: req.body.StrengthAM,
      dexterity: req.body.DexterityAM,
      constitution: req.body.ConstitutionAM,
      intelligence: req.body.IntelligenceAM,
      wisdom: req.body.WisdomAM,
      charisma: req.body.CharismaAM
    },
    savingThrows: {
      strength: {
        bonus: req.body.StrengthST,
        proficient: req.body.StrengthSTP
      },
      dexterity: {
        bonus: req.body.DexterityST,
        proficient: req.body.DexteritySTP
      },
      constitution: {
        bonus: req.body.ConstitutionST,
        proficient: req.body.ConstitutionSTP
      },
      intelligence: {
        bonus: req.body.IntelligenceST,
        proficient: req.body.IntelligenceSTP
      },
    },
    skills: {
      acrobatics: {
        type: req.body.AcrobaticsType,
        bonus: req.body.AcrobaticsBonus,
        proficient: req.body.AcrobaticsProf
      },
      animalHandling: {
        type: req.body.AnimalHandlingType,
        bonus: req.body.AnimalHandlingBonus,
        proficient: req.body.AnimalHandlingProf
      },
      arcana: {
        type: req.body.ArcanaType,
        bonus: req.body.ArcanaBonus,
        proficient: req.body.ArcanaProf
      },
      athletics: {
        type: req.body.AthleticsType,
        bonus: req.body.AthleticsBonus,
        proficient: req.body.AthleticsProf
      },
      deception: {
        type: req.body.DeceptionType,
        bonus: req.body.DeceptionBonus,
        proficient: req.body.DeceptionProf
      },
      history: {
        type: req.body.HistoryType,
        bonus: req.body.HistoryBonus,
        proficient: req.body.HistoryProf
      },
      insight: {
        type: req.body.InsightType,
        bonus: req.body.InsightBonus,
        proficient: req.body.InsightProf
      },
      investigation: {
        type: req.body.InvestigationType,
        bonus: req.body.InvestigationBonus,
        proficient: req.body.InvestigationProf
      },
      medicine: {
        type: req.body.MedicineType,
        bonus: req.body.MedicineBonus,
        proficient: req.body.MedicineProf
      },
      nature: {
        type: req.body.NatureType,
        bonus: req.body.NatureBonus,
        proficient: req.body.NatureProf
      },
      perception: {
        type: req.body.PerceptionType,
        bonus: req.body.PerceptionBonus,
        proficient: req.body.PerceptionProf
      },
      performance: {
        type: req.body.PerformanceType,
        bonus: req.body.PerformanceBonus,
        proficient: req.body.PerformanceProf
      },
      persuasion: {
        type: req.body.PersuasionType,
        bonus: req.body.PersuasionBonus,
        proficient: req.body.PersuasionProf
      },
      religion: {
        type: req.body.ReligionType,
        bonus: req.body.ReligionBonus,
        proficient: req.body.ReligionProf
      },
      sleightOfHand: {
        type: req.body.SleightOfHandType,
        bonus: req.body.SleightOfHandBonus,
        proficient: req.body.SleightOfHandProf
      },
      stealth: {
        type: req.body.StealthType,
        bonus: req.body.StealthBonus,
        proficient: req.body.StealthProf
      },
      survival: {
        type: req.body.SurvivalType,
        bonus: req.body.SurvivalBonus,
        proficient: req.body.SurvivalProf
      }
    },
    deathSaves: {
      successCount: 0,
      failCount: 0
    },
    proficiencyBonus: req.body.proficiencyBonus,
    physicalTraits: {
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      eyes: req.body.eyes,
      skin: req.body.skin,
      hair: req.body.hair,
      size: req.body.size
    },
    personalTraits: {
      personalityTraits: req.body.personalityTraits,
      ideals: req.body.ideals,
      bonds: req.body.bonds,
      flaws: req.body.flaws,
      featuresAndTraits: req.body.featuresAndTraits,
      background: req.body.background
    },
    alignment: req.body.alignment,
    languages: req.body.languages,
    passivePerception: req.body.passivePerception,
    inspiration: req.body.inspiration
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
