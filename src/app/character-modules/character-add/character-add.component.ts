import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {ErrorStateMatcher} from '@angular/material/core';
import * as $ from 'jquery';

export class CharacterErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.scss']
})
export class CharacterAddComponent implements OnInit {

  characterBasics: FormGroup;
  abilityDetails: FormGroup;
  characterStats: FormGroup;
  characterTraits: FormGroup;
  classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
  races = ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'];
  alignments = ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil', 'Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil'];
  isLoadingResults = false;
  abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
  skills = ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight Of Hand', 'Stealth', 'Survival'];
  matcher = new CharacterErrorStateMatcher();
  currencies = ['CP', 'SP', 'EP', 'GP', 'PP'];
  languages = ['Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish', 'Goblin', 'Halfling', 'Orc', 'Abyssal', 'Celestial', 'Deep Speech', 'Draconic', 'Infernal', 'Primordial', 'Sylvan', 'Undercommon'];
  backgrounds = ['Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero', 'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'];
  classBonus = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };
  raceBonus = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  };
  classSkills = [];
  classSkillTotal = 0;
  raceSkills = [];
  raceSkillTotal = 0;
  heightDie = 0;
  baseHeight = 0;
  weightDie = 0;
  weightDieCount = 0;
  baseWeight = 0;
  wealthDieCount = 0;
  wealthDieMultiplier = 10;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.characterBasics = this.formBuilder.group({
      'name' : [null, Validators.required],
      'characterClass' : [null, Validators.required],
      'characterRace' : [null, Validators.required],
      'level' : [1, Validators.required],
      'xp' : [0, Validators.required],
      'background' : [null, Validators.required],
      'subRace' : [null],
      'alignment' : [null, Validators.required],
      'subClass' : [null]
    });
    this.abilityDetails = this.formBuilder.group({
      'proficiencyBonus' : [2, Validators.required],
      'passivePerception' : [10, Validators.required],
      'inspiration' : [0, Validators.required],
      'proficiencies': [null],
      'StrengthAS' : [10, Validators.required],
      'StrengthScore' : new FormControl({value: 10, disabled: true}),
      'DexterityAS' : [10, Validators.required],
      'DexterityScore' : new FormControl({value: 10, disabled: true}),
      'ConstitutionAS' : [10, Validators.required],
      'ConstitutionScore' : new FormControl({value: 10, disabled: true}),
      'IntelligenceAS' : [10, Validators.required],
      'IntelligenceScore' : new FormControl({value: 10, disabled: true}),
      'WisdomAS' : [10, Validators.required],
      'WisdomScore' : new FormControl({value: 10, disabled: true}),
      'CharismaAS' : [10, Validators.required],
      'CharismaScore' : new FormControl({value: 10, disabled: true}),
      'StrengthAM' : [0, Validators.required],
      'DexterityAM' : [0, Validators.required],
      'ConstitutionAM' : [0, Validators.required],
      'IntelligenceAM' : [0, Validators.required],
      'WisdomAM' : [0, Validators.required],
      'CharismaAM' : [0, Validators.required],
      'StrengthST' : [0, Validators.required],
      'DexterityST' : [0, Validators.required],
      'ConstitutionST' : [0, Validators.required],
      'IntelligenceST' : [0, Validators.required],
      'WisdomST' : [0, Validators.required],
      'CharismaST' : [0, Validators.required],
      'StrengthSTP' : [false, Validators.required],
      'DexteritySTP' : [false, Validators.required],
      'ConstitutionSTP' : [false, Validators.required],
      'IntelligenceSTP' : [false, Validators.required],
      'WisdomSTP' : [false, Validators.required],
      'CharismaSTP' : [false, Validators.required],
      'AcrobaticsType' : new FormControl({value: 'DEX', disabled: true}),
      'AcrobaticsBonus' : [0, Validators.required],
      'AcrobaticsProf' : [false, Validators.required],
      'AnimalHandlingType' : new FormControl({value: 'WIS', disabled: true}),
      'AnimalHandlingBonus' : [0, Validators.required],
      'AnimalHandlingProf' : [false, Validators.required],
      'ArcanaType' : new FormControl({value: 'INT', disabled: true}),
      'ArcanaBonus' : [0, Validators.required],
      'ArcanaProf' : [false, Validators.required],
      'AthleticsType' : new FormControl({value: 'STR', disabled: true}),
      'AthleticsBonus' : [0, Validators.required],
      'AthleticsProf' : [false, Validators.required],
      'DeceptionType' : new FormControl({value: 'CHA', disabled: true}),
      'DeceptionBonus' : [0, Validators.required],
      'DeceptionProf' : [false, Validators.required],
      'HistoryType' : new FormControl({value: 'INT', disabled: true}),
      'HistoryBonus' : [0, Validators.required],
      'HistoryProf' : [false, Validators.required],
      'InsightType' : new FormControl({value: 'WIS', disabled: true}),
      'InsightBonus' : [0, Validators.required],
      'InsightProf' : [false, Validators.required],
      'IntimidationType' : new FormControl({value: 'CHA', disabled: true}),
      'IntimidationBonus' : [0, Validators.required],
      'IntimidationProf' : [false, Validators.required],
      'InvestigationType' : new FormControl({value: 'INT', disabled: true}),
      'InvestigationBonus' : [0, Validators.required],
      'InvestigationProf' : [false, Validators.required],
      'MedicineType' : new FormControl({value: 'WIS', disabled: true}),
      'MedicineBonus' : [0, Validators.required],
      'MedicineProf' : [false, Validators.required],
      'NatureType' : new FormControl({value: 'INT', disabled: true}),
      'NatureBonus' : [0, Validators.required],
      'NatureProf' : [false, Validators.required],
      'PerceptionType' : new FormControl({value: 'WIS', disabled: true}),
      'PerceptionBonus' : [0, Validators.required],
      'PerceptionProf' : [false, Validators.required],
      'PerformanceType' : new FormControl({value: 'CHA', disabled: true}),
      'PerformanceBonus' : [0, Validators.required],
      'PerformanceProf' : [false, Validators.required],
      'PersuasionType' : new FormControl({value: 'CHA', disabled: true}),
      'PersuasionBonus' : [0, Validators.required],
      'PersuasionProf' : [false, Validators.required],
      'ReligionType' : new FormControl({value: 'INT', disabled: true}),
      'ReligionBonus' : [0, Validators.required],
      'ReligionProf' : [false, Validators.required],
      'SleightOfHandType' : new FormControl({value: 'DEX', disabled: true}),
      'SleightOfHandBonus' : [0, Validators.required],
      'SleightOfHandProf' : [false, Validators.required],
      'StealthType' : new FormControl({value: 'DEX', disabled: true}),
      'StealthBonus' : [0, Validators.required],
      'StealthProf' : [false, Validators.required],
      'SurvivalType' : new FormControl({value: 'WIS', disabled: true}),
      'SurvivalBonus' : [0, Validators.required],
      'SurvivalProf' : [false, Validators.required]
    });
    this.characterStats = this.formBuilder.group({
      'speed' : [20, Validators.required],
      'initiative' : [0, Validators.required],
      'armorClass' : [10, Validators.required],
      'hitDiceTotal' : [1, Validators.required],
      'hitDieSize' : [8, Validators.required],
      'hitPointMaximum' : [8, Validators.required],
      'currentHitPoints' : [8, Validators.required],
      'temporaryHitPoints' : [0, Validators.required],
      'CP' : [0],
      'SP' : [0],
      'EP' : [0],
      'GP' : [0],
      'PP' : [0]
    });
    this.characterTraits = this.formBuilder.group({
      'age' : [1, Validators.required],
      'baseHeight': new FormControl({value: 0, disabled: true, required: true}),
      'height' : [0],
      'heightDie': [0],
      'baseWeight': new FormControl({value: 0, disabled: true, required: true}),
      'weightDie': [0],
      'weight' : [0],
      'eyes' : [null],
      'skin' : [null],
      'hair' : [null],
      'size' : [null],
      'personalityTraits' : [null],
      'ideals' : [null],
      'bonds' : [null],
      'flaws' : [null],
      'featuresAndTraits' : [null],
      'languages' : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addCharacter(this.characterBasics.value)
      .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['characters/', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  updateScore(ability) {
    let score, am;
    switch(ability) {
      case 'Strength': {
        score = this.abilityDetails.value.StrengthAS + this.classBonus.strength + this.raceBonus.strength;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.abilityDetails.patchValue({StrengthScore: score});
        this.abilityDetails.patchValue({StrengthAM: am});
        break;
      }
      case 'Dexterity': {
        score = this.abilityDetails.value.DexterityAS + this.classBonus.dexterity + this.raceBonus.dexterity;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.abilityDetails.patchValue({DexterityScore: score});
        this.abilityDetails.patchValue({DexterityAM: am});
        break;
      }
      case 'Constitution': {
        score = this.abilityDetails.value.ConstitutionAS + this.classBonus.constitution + this.raceBonus.constitution;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.abilityDetails.patchValue({ConstitutionScore: score});
        this.abilityDetails.patchValue({ConstitutionAM: am});
        break;
      }
      case 'Intelligence': {
        score = this.abilityDetails.value.IntelligenceAS + this.classBonus.intelligence + this.raceBonus.intelligence;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.abilityDetails.patchValue({IntelligenceScore: score});
        this.abilityDetails.patchValue({IntelligenceAM: am});
        break;
      }
      case 'Wisdom': {
        score = this.abilityDetails.value.WisdomAS + this.classBonus.wisdom + this.raceBonus.wisdom;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.abilityDetails.patchValue({WisdomScore: score});
        this.abilityDetails.patchValue({WisdomAM: am});
        break;
      }
      case 'Charisma': {
        score = this.abilityDetails.value.CharismaAS + this.classBonus.charisma + this.raceBonus.charisma;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.abilityDetails.patchValue({CharismaScore: score});
        this.abilityDetails.patchValue({CharismaAM: am});
        break;
      }
      default: {

      }
    }
    this.updateSavingThrow(ability);
    this.updateInitiative();

    for(let skill of this.skills) {
      this.updateSkill(skill)
    }

    if(ability === "Wisdom") {
      this.updatePassivePerception();
    }
  }
  updateSavingThrow(ability) {
    let am, newBonus;
    let proficiency = this.abilityDetails.value.proficiencyBonus;
    switch(ability) {
      case 'Strength': {
        am = this.abilityDetails.value.StrengthAM;
        newBonus = am + ((this.abilityDetails.value.StrengthSTP) ? proficiency : 0);
        this.abilityDetails.patchValue({StrengthST: newBonus});
        break;
      }
      case 'Dexterity': {
        am = this.abilityDetails.value.DexterityAM;
        newBonus = am + ((this.abilityDetails.value.DexteritySTP) ? proficiency : 0);
        this.abilityDetails.patchValue({DexterityST: newBonus});
        break;
      }
      case 'Constitution': {
        am = this.abilityDetails.value.ConstitutionAM;
        newBonus = am + ((this.abilityDetails.value.ConstitutionSTP) ? proficiency : 0);
        this.abilityDetails.patchValue({ConstitutionST: newBonus});
        break;
      }
      case 'Intelligence': {
        am = this.abilityDetails.value.IntelligenceAM;
        newBonus = am + ((this.abilityDetails.value.IntelligenceSTP) ? proficiency : 0);
        this.abilityDetails.patchValue({IntelligenceST: newBonus});
        break;
      }
      case 'Wisdom': {
        am = this.abilityDetails.value.WisdomAM;
        newBonus = am + ((this.abilityDetails.value.WisdomSTP) ? proficiency : 0);
        this.abilityDetails.patchValue({WisdomST: newBonus});
        break;
      }
      case 'Charisma': {
        am = this.abilityDetails.value.CharismaAM;
        newBonus = am + ((this.abilityDetails.value.CharismaSTP) ? proficiency : 0);
        this.abilityDetails.patchValue({CharismaST: newBonus});
        break;
      }
      default: {

      }
    }
  }
  updateProficiency() {
    for(let ability of this.abilities) {
      this.updateSavingThrow(ability);
    }
    this.updatePassivePerception();
  }
  updateSkill(skill) {
    let am, newBonus;
    let proficiency = this.abilityDetails.value.proficiencyBonus;

    switch(skill) {
      case 'Acrobatics':
        am = this.abilityDetails.value.DexterityAM;
        newBonus = am + ((this.abilityDetails.value.AcrobaticsProf) ? proficiency : 0);
        this.abilityDetails.patchValue({AcrobaticsBonus: newBonus});
        break;
      case 'AnimalHandling':
        am = this.abilityDetails.value.WisdomAM;
        newBonus = am + ((this.abilityDetails.value.AnimalHandlingProf) ? proficiency : 0);
        this.abilityDetails.patchValue({AnimalHandlingBonus: newBonus});
        break;
      case 'Arcana':
        am = this.abilityDetails.value.IntelligenceAM;
        newBonus = am + ((this.abilityDetails.value.ArcanaProf) ? proficiency : 0);
        this.abilityDetails.patchValue({ArcanaBonus: newBonus});
        break;
      case 'Athletics':
        am = this.abilityDetails.value.StrengthAM;
        newBonus = am + ((this.abilityDetails.value.AthleticsProf) ? proficiency : 0);
        this.abilityDetails.patchValue({AthleticsBonus: newBonus});
        break;
      case 'Deception':
        am = this.abilityDetails.value.CharismaAM;
        newBonus = am + ((this.abilityDetails.value.DeceptionProf) ? proficiency : 0);
        this.abilityDetails.patchValue({DeceptionBonus: newBonus});
        break;
      case 'History':
        am = this.abilityDetails.value.IntelligenceAM;
        newBonus = am + ((this.abilityDetails.value.HistoryProf) ? proficiency : 0);
        this.abilityDetails.patchValue({HistoryBonus: newBonus});
        break;
      case 'Insight':
        am = this.abilityDetails.value.WisdomAM;
        newBonus = am + ((this.abilityDetails.value.InsightProf) ? proficiency : 0);
        this.abilityDetails.patchValue({InsightBonus: newBonus});
        break;
      case 'Intimidation':
        am = this.abilityDetails.value.CharismaAM;
        newBonus = am + ((this.abilityDetails.value.IntimidationProf) ? proficiency : 0);
        this.abilityDetails.patchValue({IntimidationBonus: newBonus});
        break;
      case 'Investigation':
        am = this.abilityDetails.value.IntelligenceAM;
        newBonus = am + ((this.abilityDetails.value.InvestigationProf) ? proficiency : 0);
        this.abilityDetails.patchValue({InvestigationBonus: newBonus});
        break;
      case 'Medicine':
        am = this.abilityDetails.value.WisdomAM;
        newBonus = am + ((this.abilityDetails.value.MedicineProf) ? proficiency : 0);
        this.abilityDetails.patchValue({MedicineBonus: newBonus});
        break;
      case 'Nature':
        am = this.abilityDetails.value.IntelligenceAM;
        newBonus = am + ((this.abilityDetails.value.NatureProf) ? proficiency : 0);
        this.abilityDetails.patchValue({NatureBonus: newBonus});
        break;
      case 'Perception':
        am = this.abilityDetails.value.WisdomAM;
        newBonus = am + ((this.abilityDetails.value.PerceptionProf) ? proficiency : 0);
        this.abilityDetails.patchValue({PerceptionBonus: newBonus});
        break;
      case 'Performance':
        am = this.abilityDetails.value.CharismaAM;
        newBonus = am + ((this.abilityDetails.value.PerformanceProf) ? proficiency : 0);
        this.abilityDetails.patchValue({PerformanceBonus: newBonus});
        break;
      case 'Persuasion':
        am = this.abilityDetails.value.CharismaAM;
        newBonus = am + ((this.abilityDetails.value.PersuasionProf) ? proficiency : 0);
        this.abilityDetails.patchValue({PersuasionBonus: newBonus});
        break;
      case 'Religion':
        am = this.abilityDetails.value.IntelligenceAM;
        newBonus = am + ((this.abilityDetails.value.ReligionProf) ? proficiency : 0);
        this.abilityDetails.patchValue({ReligionBonus: newBonus});
        break;
      case 'SleightOfHand':
        am = this.abilityDetails.value.DexterityAM;
        newBonus = am + ((this.abilityDetails.value.SleightOfHandProf) ? proficiency : 0);
        this.abilityDetails.patchValue({SleightOfHandBonus: newBonus});
        break;
      case 'Stealth':
        am = this.abilityDetails.value.DexterityAM;
        newBonus = am + ((this.abilityDetails.value.StealthProf) ? proficiency : 0);
        this.abilityDetails.patchValue({StealthBonus: newBonus});
        break;
      case 'Survival':
        am = this.abilityDetails.value.WisdomAM;
        newBonus = am + ((this.abilityDetails.value.SurvivalProf) ? proficiency : 0);
        this.abilityDetails.patchValue({SurvivalBonus: newBonus});
        break;
      default: {

      }
    }
    this.updatePassivePerception();
  }
  onLevelChange() {
    let lvl = this.characterBasics.value.level;
    let newBonus = Math.floor((lvl+3) / 4) + 1;
    this.abilityDetails.patchValue({proficiencyBonus: newBonus});

    this.updateProficiency();
  }
  updateInitiative() {
    this.characterStats.patchValue({initiative: this.abilityDetails.value.DexterityAM});
  }
  static getAbilityModifier(score) {
    score -= score % 2;
    return Math.ceil((score - 10) / 2);
  }
  updatePassivePerception() {
    let newPerception = 10 + this.abilityDetails.value.WisdomAM + ((this.characterBasics.value.PerceptionProf) ? this.characterBasics.value.proficiencyBonus : 0);
    this.abilityDetails.patchValue({passivePerception: newPerception});
  }
  getSubClass() {
    let subClasses;
    let characterClass = this.characterBasics.value.characterClass;

    switch(characterClass) {
      case 'Barbarian': {
        subClasses = ['Path of the Berserker', 'Path of the Totem Warrior'];
        break;
      }
      case 'Bard': {
        subClasses = ['College of Lore', 'College of Valor'];
        break;
      }
      case 'Cleric': {
        subClasses = ['Knowledge', 'Life', 'Light', 'Nature', 'Tempest', 'Trickery', 'War'];
        break;
      }
      case 'Druid': {
        subClasses = ['Circle of the Land', 'Circle of the Moon'];
        break;
      }
      case 'Fighter': {
        subClasses = ['Champion', 'Battle Master', 'Eldritch Knight'];
        break;
      }
      case 'Monk': {
        subClasses = ['Way of the Open Hand', 'Way of Shadow', 'Way of the Four Elements'];
        break;
      }
      case 'Paladin': {
        subClasses = ['Oath of Devotion', 'Oath of the Ancients', 'Oath of Vengeance'];
        break;
      }
      case 'Ranger': {
        subClasses = ['Hunter', 'Beast Master'];
        break;
      }
      case 'Rogue': {
        subClasses = ['Thief', 'Assassin', 'Arcane Trickster'];
        break;
      }
      case 'Sorcerer': {
        subClasses = ['Draconic Bloodline', 'Wild Magic'];
        break;
      }
      case 'Warlock': {
        subClasses = ['Archfey', 'Fiend', 'Great Old One'];
        break;
      }
      case 'Wizard': {
        subClasses = ['School of Abjuration', 'School of Conjuration', 'School of Divination', 'School of Enchantment', 'School of Evocation', 'School of Illusion', 'School of Necromancy', 'School of Transmutation'];
        break;
      }
    }
    return subClasses;
  }
  getSubClassLabel() {
    let characterClass = this.characterBasics.value.characterClass;
    let label;
    switch(characterClass) {
      case 'Barbarian': {
        label = 'Path';
        break;
      }
      case 'Bard': {
        label = 'College';
        break;
      }
      case 'Cleric': {
        label = 'Domain';
        break;
      }
      case 'Druid': {
        label = 'Circle';
        break;
      }
      case 'Fighter': {
        label = 'Martial Archetype';
        break;
      }
      case 'Monk': {
        label = 'Monastic Traditions';
        break;
      }
      case 'Paladin': {
        label = 'Sacred Oath';
        break;
      }
      case 'Ranger': {
        label = 'Ranger Archetype';
        break;
      }
      case 'Rogue': {
        label = 'Roguish Archetype';
        break;
      }
      case 'Sorcerer': {
        label = 'Sorcerous Origins';
        break;
      }
      case 'Warlock': {
        label = 'Otherworldy Patron';
        break;
      }
      case 'Wizard': {
        label = 'Arcane Tradition';
        break;
      }
      default: {
        label = 'Sub Class';
      }
    }
    return label;
  }
  getSubRaces() {
    let race = this.characterBasics.value.characterRace;
    let subRaces = [];
    switch(race) {
      case 'Dwarf': {
        subRaces = ['Hill Dwarf', 'Mountain Dwarf'];
        break;
      }
      case 'Elf': {
        subRaces = ['High Elf', 'Wood Elf', 'Dark Elf (Drow)'];
        break;
      }
      case 'Halfling': {
        subRaces = ['Lightfoot', 'Stout'];
        break;
      }
      case 'Human': {
        subRaces = ['Calishite', 'Chondathan', 'Damaran', 'Illuskan', 'Mulan', 'Rashemi', 'Shou', 'Tethyrian', 'Turami'];
        break;
      }
      case 'Dragonborn': {
        subRaces = ['Black', 'Blue', 'Brass', 'Bronze', 'Copper', 'Gold', 'Green', 'Red', 'Silver', 'White'];
        break;
      }
      case 'Gnome': {
        subRaces = ['Forest Gnome', 'Rock Gnome'];
        break;
      }
      case 'Half-Elf': {
        subRaces = ['Diplomat', 'Wanderer'];
        break;
      }
      case 'Half-Orc': {
        subRaces = [];
        break;
      }
      case 'Tiefling': {
        subRaces = ['Infernal', 'Virtue'];
        break;
      }
    }
    return subRaces;
  }
  getSubRaceLabel() {

    let race = this.characterBasics.value.characterRace;
    let label;

    switch(race) {
      case 'Dwarf':
      case 'Elf':
      case 'Halfling': {
        label = 'Sub Race';
        break;
      }
      case 'Human': {
        label = 'Ethnicity';
        break;
      }
      case 'Dragonborn': {
        label = 'Draconic Ancestry';
        break;
      }
      case 'Gnome': {
        label = 'Sub Race';
        break;
      }
      case 'Half-Elf': {
        label = 'Trait';
        break;
      }
      case 'Tiefling': {
        label = 'Tiefling Origin';
        break;
      }
      default: {
        label = 'Sub Race';
        break;
      }
    }
    return label;
  }
  onClassChange() {
    let characterClass = this.characterBasics.value.characterClass;
    let subClass = this.characterBasics.value.subClass;
    let proficiencies = this.abilityDetails.value.proficiencies;
    let languages = this.characterTraits.value.languages;
    this.abilityDetails.patchValue({StrengthSTP: false});
    this.abilityDetails.patchValue({DexteritySTP: false});
    this.abilityDetails.patchValue({ConstitutionSTP: false});
    this.abilityDetails.patchValue({IntelligenceSTP: false});
    this.abilityDetails.patchValue({WisdomSTP: false});
    this.abilityDetails.patchValue({CharismaSTP: false});

    switch(characterClass) {
      case 'Barbarian': {
        this.abilityDetails.patchValue({StrengthSTP: true});
        this.abilityDetails.patchValue({ConstitutionSTP: true});
        this.characterStats.patchValue({hitDieSize: 12});
        this.classSkills = ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'];
        this.classSkillTotal = 2;
        this.wealthDieCount = 2;
        break;
      }
      case 'Bard': {
        this.abilityDetails.patchValue({DexteritySTP: true});
        this.abilityDetails.patchValue({CharismaSTP: true});
        this.characterTraits.patchValue({hitDieSize: 8});
        this.classSkills = this.skills;
        this.classSkillTotal = 3;
        this.wealthDieCount = 5;
        break;
      }
      case 'Cleric': {
        this.abilityDetails.patchValue({WisdomSTP: true});
        this.abilityDetails.patchValue({CharismaSTP: true});
        this.characterTraits.patchValue({hitDieSize: 8});
        this.classSkills = ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'];
        this.classSkillTotal = 2;
        this.wealthDieCount = 5;
        break;
      }
      case 'Druid': {
        this.abilityDetails.patchValue({IntelligenceSTP: true});
        this.abilityDetails.patchValue({WisdomSTP: true});
        this.characterTraits.patchValue({hitDieSize: 8});
        this.classSkills = ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'];
        this.classSkillTotal = 2;
        this.wealthDieCount = 2;
        break;
      }
      case 'Fighter': {
        this.abilityDetails.patchValue({StrengthSTP: true});
        this.abilityDetails.patchValue({ConstitutionSTP: true});
        this.characterTraits.patchValue({hitDieSize: 10});
        this.classSkills = ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'];
        this.classSkillTotal = 2;
        this.wealthDieCount = 5;
        break;
      }
      case 'Monk': {
        this.abilityDetails.patchValue({StrengthSTP: true});
        this.abilityDetails.patchValue({WisdomSTP: true});
        this.characterTraits.patchValue({hitDieSize: 8});
        this.classSkills = ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'];
        this.classSkillTotal = 2;
        this.wealthDieCount = 5;
        this.wealthDieMultiplier = 1;
        break;
      }
      case 'Paladin': {
        this.abilityDetails.patchValue({WisdomSTP: true});
        this.abilityDetails.patchValue({CharismaSTP: true});
        this.characterTraits.patchValue({hitDieSize: 10});
        this.classSkills = ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'];
        this.classSkillTotal = 2;
        this.wealthDieCount = 5;
        break;
      }
      case 'Ranger': {
        this.abilityDetails.patchValue({StrengthSTP: true});
        this.abilityDetails.patchValue({DexteritySTP: true});
        this.characterTraits.patchValue({hitDieSize: 10});
        this.classSkills = ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'];
        this.classSkillTotal = 3;
        this.wealthDieCount = 5;
        break;
      }
      case 'Rogue': {
        this.abilityDetails.patchValue({DexteritySTP: true});
        this.abilityDetails.patchValue({IntelligenceSTP: true});
        this.characterTraits.patchValue({hitDieSize: 8});
        this.classSkills = ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth'];
        this.classSkillTotal = 4;
        this.wealthDieCount = 4;
        break;
      }
      case 'Sorcerer': {
        this.abilityDetails.patchValue({ConstitutionSTP: true});
        this.abilityDetails.patchValue({CharismaSTP: true});
        this.characterTraits.patchValue({hitDieSize: 6});
        this.classSkills = ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'];
        this.classSkillTotal = 2;
        this.wealthDieCount = 3;
        break;
      }
      case 'Warlock': {
        this.abilityDetails.patchValue({WisdomSTP: true});
        this.abilityDetails.patchValue({CharismaSTP: true});
        this.characterTraits.patchValue({hitDieSize: 8});
        this.classSkills = ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion'];
        this.classSkillTotal = 2;
        this.wealthDieCount = 3;
        break;
      }
      case 'Wizard': {
        this.abilityDetails.patchValue({IntelligenceSTP: true});
        this.abilityDetails.patchValue({WisdomSTP: true});
        this.characterTraits.patchValue({hitDieSize: 6});
        this.classSkills = ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'];
        this.classSkillTotal = 2;
        this.wealthDieCount = 4;
      }
    }

    for(let ability of this.abilities) {
      console.log(ability);
      this.updateScore(ability);
    }

    this.highlightSkills();
  }
  onRaceChange() {
    let race = this.characterBasics.value.characterRace;
    let subRace = this.characterBasics.value.subRace;
    let proficiencies = this.abilityDetails.value.proficiencies;
    let languages = this.characterTraits.value.languages;

    switch(race) {
      case 'Dwarf': {
        this.raceBonus.constitution = 2;
        this.characterTraits.patchValue({size: 'Medium'});
        this.characterTraits.patchValue({speed: 25});

        switch(subRace) {
          case 'Hill Dwarf': {
            this.raceBonus.wisdom = 1;
            this.heightDie = 4;
            this.baseHeight = 44;
            this.baseWeight = 115;
            this.weightDie = 6;
            this.weightDieCount = 2;
            // Increase hit point by 1 every level
            break;
          }
          case 'Mountain Dwarf': {
            this.raceBonus.strength = 2;
            this.heightDie = 4;
            this.baseHeight = 48;
            this.baseWeight = 130;
            this.weightDie = 6;
            this.weightDieCount = 2;
            // light + medium armor proficiency
            break;
          }
        }
        break;
      }
      case 'Elf': {
        this.raceBonus.dexterity = 2;
        this.characterTraits.patchValue({size: 'Medium'});
        this.characterStats.patchValue({speed: 30});
        this.abilityDetails.patchValue({PerceptionProf: true});

        switch(subRace) {
          case 'High Elf': {
            this.raceBonus.intelligence = 1;
            this.heightDie = 10;
            this.baseHeight = 54;
            this.baseWeight = 90;
            this.weightDie = 4;
            this.weightDieCount = 1;
            break;
          }
          case 'Wood Elf': {
            this.raceBonus.wisdom = 1;
            this.heightDie = 10;
            this.baseHeight = 54;
            this.baseWeight = 100;
            this.weightDie = 4;
            this.weightDieCount = 1;
            this.characterBasics.patchValue({speed: 35});
            break;
          }
          case 'Dark Elf (Drow)': {
            this.raceBonus.charisma = 1;
            this.heightDie = 6;
            this.baseHeight = 53;
            this.baseWeight = 75;
            this.weightDie = 6;
            this.weightDieCount = 1;
            break;
          }
        }
        break;
      }
      case 'Halfling': {
        this.raceBonus.dexterity = 2;
        this.characterTraits.patchValue({size: 'Small'});
        this.characterStats.patchValue({speed: 25});
        this.heightDie = 4;
        this.baseHeight = 31;
        this.baseWeight = 35;
        this.weightDie = 1;
        this.weightDieCount = 1;

        switch(subRace) {
          case 'Lightfoot': {
            this.raceBonus.charisma = 1;
            break;
          }
          case 'Stout': {
            this.raceBonus.constitution = 1;
            break;
          }
        }
        break;
      }
      case 'Human': {
        this.raceBonus.strength = 1;
        this.raceBonus.dexterity = 1;
        this.raceBonus.constitution = 1;
        this.raceBonus.intelligence = 1;
        this.raceBonus.wisdom = 1;
        this.raceBonus.charisma = 1;
        this.characterTraits.patchValue({size: 'Medium'});
        this.characterStats.patchValue({speed: 30});
        this.heightDie = 10;
        this.baseHeight = 56;
        this.baseWeight = 110;
        this.weightDie = 4;
        this.weightDieCount = 2;
        break;
      }
      case 'Dragonborn': {
        this.raceBonus.strength = 2;
        this.raceBonus.charisma = 1;
        this.characterTraits.patchValue({size: 'Medium'});
        this.characterStats.patchValue({speed: 30});
        this.heightDie = 8;
        this.baseHeight = 66;
        this.baseWeight = 175;
        this.weightDie = 6;
        this.weightDieCount = 2;
        break;
      }
      case 'Gnome': {
        this.raceBonus.intelligence = 2;
        this.characterTraits.patchValue({size: 'Small'});
        this.characterStats.patchValue({speed: 25});
        this.heightDie = 4;
        this.baseHeight = 35;
        this.baseWeight = 35;
        this.weightDie = 1;
        this.weightDieCount = 1;

        switch(subRace) {
          case 'Forest Gnome': {
            this.raceBonus.dexterity = 1;
            break;
          }
          case 'Rock Gnome': {
            this.raceBonus.constitution = 1;
            break;
          }
        }
        break;
      }
      case 'Half-Elf': {
        this.raceBonus.charisma = 2;
        this.characterTraits.patchValue({size: 'Medium'});
        this.characterStats.patchValue({speed: 30});
        this.raceSkills = this.skills;
        this.raceSkillTotal = 2;
        this.heightDie = 8;
        this.baseHeight = 57;
        this.baseWeight = 110;
        this.weightDie = 4;
        this.weightDieCount = 2;
        // select 2 to increase by 1
        break;
      }
      case 'Half-Orc': {
        this.raceBonus.strength = 2;
        this.raceBonus.constitution = 1;
        this.characterTraits.patchValue({size: 'Medium'});
        this.characterStats.patchValue({speed: 30});
        this.abilityDetails.patchValue({IntimidationProf: true});
        this.heightDie = 10;
        this.baseHeight = 58;
        this.baseWeight = 140;
        this.weightDie = 6;
        this.weightDieCount = 2;
        break;
      }
      case 'Tiefling': {
        this.raceBonus.intelligence = 1;
        this.raceBonus.charisma = 2;
        this.characterTraits.patchValue({size: 'Medium'});
        this.characterStats.patchValue({speed: 30});
        this.heightDie = 8;
        this.baseHeight = 57;
        this.baseWeight = 110;
        this.weightDie = 4;
        this.weightDieCount = 2;
        break;
      }
    }

    for(let ability of this.abilities) {
      console.log(ability);
      this.updateScore(ability);
    }

    this.characterTraits.patchValue({baseHeight:this.baseHeight});
    this.characterTraits.patchValue({baseWeight:this.baseWeight});

    this.highlightSkills();
  }
  onBackgroundChange() {

  }
  highlightSkills() {
    for(let skill of this.classSkills) {
      $("#"+skill).addClass("highlight");
    }

    for(let skill of this.raceSkills) {
      $("#"+skill).addClass("highlight");
    }
  }
  removeSpaces(text) {
    return text.split(' ').join('');
  }
  updateHeightAndWeight() {
    this.characterTraits.patchValue({height: this.characterTraits.value.baseHeight + this.characterTraits.value.heightDie});
    this.characterTraits.patchValue({weight: this.characterTraits.value.baseWeight + (this.characterTraits.value.heightDie * this.characterTraits.value.weightDie)});

  }
}
