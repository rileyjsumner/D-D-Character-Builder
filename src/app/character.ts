export interface Character {
  id: number;
  name: string;
  race: string;
  subRace: string;
  class: string;
  subClass: string;
  archetype: string;
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
  equipment: {};
}
