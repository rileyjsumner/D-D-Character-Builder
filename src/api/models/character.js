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
    required: true,
  },
  speed: {
    type: Number,
    required: true
  },
  initiative: {
    type: Number,
    required: true
  },
  subClass: {
    type: String,
    required: true
  },
  subRace: {
    type: String,
    required: true
  },
  armorClass: {
    type: Number,
    required: true
  },
  hitDiceTotal: {
    type: Number,
    required: true
  },
  hitDieSize: {
    type: Number,
    required: true
  },
  hitPointMaximum: {
    type: Number,
    required: true
  },
  currentHitPoints: {
    type: Number,
    required: true
  },
  temporaryHitPoints: {
    type: Number,
    required: true
  },
  deathSaves: {
    successCount: {
      type: Number,
      required: false
    },
    deathCount: {
      type: Number,
      required: false
    }
  },
  proficiencyBonus: {
    type: Number,
    required: true
  },
  passivePerception: {
    type: Number,
    required: true
  },
  inspiration: {
    type: Number,
    required: true
  },
  alignment: {
    type: String,
    required: true
  },
  abilityScores: {
    strength: {
      type: Number,
      required: true
    },
    dexterity: {
      type: Number,
      required: true
    },
    constitution: {
      type: Number,
      required: true
    },
    intelligence: {
      type: Number,
      required: true
    },
    wisdom: {
      type: Number,
      required: true
    },
    charisma: {
      type: Number,
      required: true
    },
  },
  abilityModifiers: {
    strength: {
      type: Number,
      required: true
    },
    dexterity: {
      type: Number,
      required: true
    },
    constitution: {
      type: Number,
      required: true
    },
    intelligence: {
      type: Number,
      required: true
    },
    wisdom: {
      type: Number,
      required: true
    },
    charisma: {
      type: Number,
      required: true
    },
  },
  savingThrows: {
    strength: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    dexterity: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    constitution: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    intelligence: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    wisdom: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    charisma: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
  },
  physicalTraits: {
    age: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    eyes: {
      type: String,
      required: true
    },
    skin: {
      type: String,
      required: true
    },
    hair: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    }
  },
  personalTraits: {
    personalityTraits: {
      type: String,
      required: false
    },
    ideals: {
      type: String,
      required: false
    },
    bonds: {
      type: String,
      required: false
    },
    flaws: {
      type: String,
      required: false
    },
    featuresAndTraits: {
      type: String,
      required: false
    },
    background: {
      type: String,
      required: false
    },
  },
  skills: {
    acrobatics: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    animalHandling: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    arcana: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    athletics: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    deception: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    history: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    insight: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    investigation: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    medicine: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    nature: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    perception: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    performance: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    persuasion: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    religion: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    sleightOfHand: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    stealth: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    },
    survival: {
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    }
  },
  proficiencies: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Character', characterSchema);
