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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
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
      type: {
        type: String,
        required: true
      },
      bonus: {
        type: Number,
        required: true
      },
      proficient: {
        type: Boolean,
        required: true
      }
    }
  }
});

module.exports = mongoose.model('Character', characterSchema);
