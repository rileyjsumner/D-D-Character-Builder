export class Character {
  _id: string;
  name: string;
  characterRace: string;
  characterClass: string;
  level: number;
  speed: number;
  initiative: number;
  subRace: string;
  subClass: string;
  armorClass: number;
  hitDiceTotal: number;
  hitDieSize: number;
  hitPointMaximum: number;
  currentHitPoints: number;
  temporaryHitPoints: number;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  abilityModifiers: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  savingThrows: {
    strength: {
      bonus: number;
      proficient: boolean;
    },
    dexterity: {
      bonus: number;
      proficient: boolean;
    },
    constitution: {
      bonus: number;
      proficient: boolean;
    },
    intelligence: {
      bonus: number;
      proficient: boolean;
    },
    wisdom: {
      bonus: number;
      proficient: boolean;
    },
    charisma: {
      bonus: number;
      proficient: boolean;
    },
  };
  skills: {
    acrobatics: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    animalHandling: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    arcana: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    athletics: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    deception: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    history: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    insight: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    investigation: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    medicine: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    nature: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    perception: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    performance: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    persuasion: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    religion: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    sleightOfHand: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    stealth: {
      type: string;
      bonus: number;
      proficient: boolean;
    },
    survival: {
      type: string;
      bonus: number;
      proficient: boolean;
    }
  };
  deathSaves: {
    successCount: number;
    failCount: number;
  };
  proficiencyBonus: number;
  physicalTraits: {
    age: number;
    height: number;
    weight: number;
    eyes: string;
    skin: string;
    hair: string;
    size: string;
  };
  personalTraits: {
    personalityTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
    featuresAndTraits: string;
    background: string;
  };
  alignment: string;
  languages: string;
  passivePerception: number;
  inspiration: number;

}
