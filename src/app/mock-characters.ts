import { Character } from './character';

export const CHARACTERS: Character[] = [
  { id: 1,
    name: 'Glynbalar',
    class: 'Ranger',
    race: 'Elf',
    subClass: 'Beast Master',
    subRace: 'Wood',
    archetype: 'Archer',
    abilityScores: {
      strength: 15,
      dexterity: 13,
      constitution: 14,
      intelligence: 17,
      wisdom: 13,
      charisma: 11
    },
    abilityModifiers: {
      strength: 3,
      dexterity: 1,
      constitution: 2,
      intelligence: 3,
      wisdom: 1,
      charisma: 0
    },
    equipment: {}
  }
];
