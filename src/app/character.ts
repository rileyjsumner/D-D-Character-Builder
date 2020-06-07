export class Character {
  _id: string;
  name: string;
  level: number;
  race: string;
  subrace: string;
  class: string;
  subclass: string;
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
  proficiencyBonus: number;
  age: number;
  alignment: string;
  speed: number;
  size: string;
  languages: string[];

}
