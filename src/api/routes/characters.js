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
    level: req.body.level,
    initiative: req.body.initiative,
    xp: req.body.xp,
    speed: req.body.speed,
    subRace: req.body.subRace,
    subClass: req.body.subClass,
    armorClass: req.body.armorClass,
    hitDiceTotal: req.body.hitDiceTotal,
    hitDieSize: req.body.hitDieSize,
    hitPointMaximum: req.body.hitPointMaximum,
    currentHitPoints: req.body.currentHitPoints,
    temporaryHitPoints: req.body.temporaryHitPoints,
    abilityScores: {
      strength: req.body.StrengthScore,
      dexterity: req.body.DexterityScore,
      constitution: req.body.ConstitutionScore,
      intelligence: req.body.IntelligenceScore,
      wisdom: req.body.WisdomScore,
      charisma: req.body.CharismaScore
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
      wisdom: {
        bonus: req.body.WisdomST,
        proficient: req.body.WisdomSTP
      },
      charisma: {
        bonus: req.body.CharismaST,
        proficient: req.body.CharismaSTP
      }
    },
    skills: {
      acrobatics: {
        bonus: req.body.AcrobaticsBonus,
        proficient: req.body.AcrobaticsProf
      },
      animalHandling: {
        bonus: req.body.AnimalHandlingBonus,
        proficient: req.body.AnimalHandlingProf
      },
      arcana: {
        bonus: req.body.ArcanaBonus,
        proficient: req.body.ArcanaProf
      },
      athletics: {
        bonus: req.body.AthleticsBonus,
        proficient: req.body.AthleticsProf
      },
      deception: {
        bonus: req.body.DeceptionBonus,
        proficient: req.body.DeceptionProf
      },
      history: {
        bonus: req.body.HistoryBonus,
        proficient: req.body.HistoryProf
      },
      insight: {
        bonus: req.body.InsightBonus,
        proficient: req.body.InsightProf
      },
      investigation: {
        bonus: req.body.InvestigationBonus,
        proficient: req.body.InvestigationProf
      },
      medicine: {
        bonus: req.body.MedicineBonus,
        proficient: req.body.MedicineProf
      },
      nature: {
        bonus: req.body.NatureBonus,
        proficient: req.body.NatureProf
      },
      perception: {
        bonus: req.body.PerceptionBonus,
        proficient: req.body.PerceptionProf
      },
      performance: {
        bonus: req.body.PerformanceBonus,
        proficient: req.body.PerformanceProf
      },
      persuasion: {
        bonus: req.body.PersuasionBonus,
        proficient: req.body.PersuasionProf
      },
      religion: {
        bonus: req.body.ReligionBonus,
        proficient: req.body.ReligionProf
      },
      sleightOfHand: {
        bonus: req.body.SleightOfHandBonus,
        proficient: req.body.SleightOfHandProf
      },
      stealth: {
        bonus: req.body.StealthBonus,
        proficient: req.body.StealthProf
      },
      survival: {
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
    inspiration: req.body.inspiration,
    proficiencies: req.body.proficiencies
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
