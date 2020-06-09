import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {ErrorStateMatcher} from '@angular/material/core';

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

  characterForm: FormGroup;
  classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
  races = ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'];
  alignments = ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil', 'Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil'];
  isLoadingResults = false;
  abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
  skills = ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight Of Hand', 'Stealth', 'Survival'];
  matcher = new CharacterErrorStateMatcher();
  currencies = ['Copper Pieces', 'Silver Pieces', 'Electrum Pieces', 'Gold Pieces', 'Platinum Pieces'];

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.characterForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'characterClass' : [null, Validators.required],
      'characterRace' : [null, Validators.required],
      'level' : [1, Validators.required],
      'speed' : [20, Validators.required],
      'initiative' : [0, Validators.required],
      'xp' : [0, Validators.required],
      'subRace' : [null],
      'subClass' : [null],
      'armorClass' : [10, Validators.required],
      'hitDiceTotal' : [1, Validators.required],
      'hitDieSize' : [8, Validators.required],
      'hitPointMaximum' : [8, Validators.required],
      'currentHitPoints' : [8, Validators.required],
      'temporaryHitPoints' : [0, Validators.required],
      'StrengthAS' : [10, Validators.required],
      'DexterityAS' : [10, Validators.required],
      'ConstitutionAS' : [10, Validators.required],
      'IntelligenceAS' : [10, Validators.required],
      'WisdomAS' : [10, Validators.required],
      'CharismaAS' : [10, Validators.required],
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
      'SurvivalProf' : [false, Validators.required],
      'proficiencyBonus' : [2, Validators.required],
      'age' : [1, Validators.required],
      'height' : [1, Validators.required],
      'weight' : [1, Validators.required],
      'eyes' : [null],
      'skin' : [null],
      'hair' : [null],
      'size' : [null],
      'personalityTraits' : [null],
      'ideals' : [null],
      'bonds' : [null],
      'flaws' : [null],
      'featuresAndTraits' : [null],
      'background' : [null, Validators.required],
      'alignment' : [null, Validators.required],
      'languages' : [null, Validators.required],
      'passivePerception' : [10, Validators.required],
      'inspiration' : [0, Validators.required],
      'CopperPieces' : [0],
      'SilverPieces' : [0],
      'ElectrumPieces' : [0],
      'GoldPieces' : [0],
      'PlatinumPieces' : [0]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addCharacter(this.characterForm.value)
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
        score = this.characterForm.value.StrengthAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({StrengthAM: am});
        break;
      }
      case 'Dexterity': {
        score = this.characterForm.value.DexterityAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({DexterityAM: am});
        break;
      }
      case 'Constitution': {
        score = this.characterForm.value.ConstitutionAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({ConstitutionAM: am});
        break;
      }
      case 'Intelligence': {
        score = this.characterForm.value.IntelligenceAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({IntelligenceAM: am});
        break;
      }
      case 'Wisdom': {
        score = this.characterForm.value.WisdomAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({WisdomAM: am});
        break;
      }
      case 'Charisma': {
        score = this.characterForm.value.CharismaAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({CharismaAM: am});
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
    let proficiency = this.characterForm.value.proficiencyBonus;
    switch(ability) {
      case 'Strength': {
        am = this.characterForm.value.StrengthAM;
        newBonus = am + ((this.characterForm.value.StrengthSTP) ? proficiency : 0);
        this.characterForm.patchValue({StrengthST: newBonus});
        break;
      }
      case 'Dexterity': {
        am = this.characterForm.value.DexterityAM;
        newBonus = am + ((this.characterForm.value.DexteritySTP) ? proficiency : 0);
        this.characterForm.patchValue({DexterityST: newBonus});
        break;
      }
      case 'Constitution': {
        am = this.characterForm.value.ConstitutionAM;
        newBonus = am + ((this.characterForm.value.ConstitutionSTP) ? proficiency : 0);
        this.characterForm.patchValue({ConstitutionST: newBonus});
        break;
      }
      case 'Intelligence': {
        am = this.characterForm.value.IntelligenceAM;
        newBonus = am + ((this.characterForm.value.IntelligenceSTP) ? proficiency : 0);
        this.characterForm.patchValue({IntelligenceST: newBonus});
        break;
      }
      case 'Wisdom': {
        am = this.characterForm.value.WisdomAM;
        newBonus = am + ((this.characterForm.value.WisdomSTP) ? proficiency : 0);
        this.characterForm.patchValue({WisdomST: newBonus});
        break;
      }
      case 'Charisma': {
        am = this.characterForm.value.CharismaAM;
        newBonus = am + ((this.characterForm.value.CharismaSTP) ? proficiency : 0);
        this.characterForm.patchValue({CharismaST: newBonus});
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
    let proficiency = this.characterForm.value.proficiencyBonus;

    switch(skill) {
      case 'Acrobatics':
        am = this.characterForm.value.DexterityAM;
        newBonus = am + ((this.characterForm.value.AcrobaticsProf) ? proficiency : 0);
        this.characterForm.patchValue({AcrobaticsBonus: newBonus});
        break;
      case 'AnimalHandling':
        am = this.characterForm.value.WisdomAM;
        newBonus = am + ((this.characterForm.value.AnimalHandlingProf) ? proficiency : 0);
        this.characterForm.patchValue({AnimalHandlingBonus: newBonus});
        break;
      case 'Arcana':
        am = this.characterForm.value.IntelligenceAM;
        newBonus = am + ((this.characterForm.value.ArcanaProf) ? proficiency : 0);
        this.characterForm.patchValue({ArcanaBonus: newBonus});
        break;
      case 'Athletics':
        am = this.characterForm.value.StrengthAM;
        newBonus = am + ((this.characterForm.value.AthleticsProf) ? proficiency : 0);
        this.characterForm.patchValue({AthleticsBonus: newBonus});
        break;
      case 'Deception':
        am = this.characterForm.value.CharismaAM;
        newBonus = am + ((this.characterForm.value.DeceptionProf) ? proficiency : 0);
        this.characterForm.patchValue({DeceptionBonus: newBonus});
        break;
      case 'History':
        am = this.characterForm.value.IntelligenceAM;
        newBonus = am + ((this.characterForm.value.HistoryProf) ? proficiency : 0);
        this.characterForm.patchValue({HistoryBonus: newBonus});
        break;
      case 'Insight':
        am = this.characterForm.value.WisdomAM;
        newBonus = am + ((this.characterForm.value.InsightProf) ? proficiency : 0);
        this.characterForm.patchValue({InsightBonus: newBonus});
        break;
      case 'Intimidation':
        am = this.characterForm.value.CharismaAM;
        newBonus = am + ((this.characterForm.value.IntimidationProf) ? proficiency : 0);
        this.characterForm.patchValue({IntimidationBonus: newBonus});
        break;
      case 'Investigation':
        am = this.characterForm.value.IntelligenceAM;
        newBonus = am + ((this.characterForm.value.InvestigationProf) ? proficiency : 0);
        this.characterForm.patchValue({InvestigationBonus: newBonus});
        break;
      case 'Medicine':
        am = this.characterForm.value.WisdomAM;
        newBonus = am + ((this.characterForm.value.MedicineProf) ? proficiency : 0);
        this.characterForm.patchValue({MedicineBonus: newBonus});
        break;
      case 'Nature':
        am = this.characterForm.value.IntelligenceAM;
        newBonus = am + ((this.characterForm.value.NatureProf) ? proficiency : 0);
        this.characterForm.patchValue({NatureBonus: newBonus});
        break;
      case 'Perception':
        am = this.characterForm.value.WisdomAM;
        newBonus = am + ((this.characterForm.value.PerceptionProf) ? proficiency : 0);
        this.characterForm.patchValue({PerceptionBonus: newBonus});
        break;
      case 'Performance':
        am = this.characterForm.value.CharismaAM;
        newBonus = am + ((this.characterForm.value.PerformanceProf) ? proficiency : 0);
        this.characterForm.patchValue({PerformanceBonus: newBonus});
        break;
      case 'Persuasion':
        am = this.characterForm.value.CharismaAM;
        newBonus = am + ((this.characterForm.value.PersuasionProf) ? proficiency : 0);
        this.characterForm.patchValue({PersuasionBonus: newBonus});
        break;
      case 'Religion':
        am = this.characterForm.value.IntelligenceAM;
        newBonus = am + ((this.characterForm.value.ReligionProf) ? proficiency : 0);
        this.characterForm.patchValue({ReligionBonus: newBonus});
        break;
      case 'SleightOfHand':
        am = this.characterForm.value.DexterityAM;
        newBonus = am + ((this.characterForm.value.SleightOfHandProf) ? proficiency : 0);
        this.characterForm.patchValue({SleightOfHandBonus: newBonus});
        break;
      case 'Stealth':
        am = this.characterForm.value.DexterityAM;
        newBonus = am + ((this.characterForm.value.StealthProf) ? proficiency : 0);
        this.characterForm.patchValue({StealthBonus: newBonus});
        break;
      case 'Survival':
        am = this.characterForm.value.WisdomAM;
        newBonus = am + ((this.characterForm.value.SurvivalProf) ? proficiency : 0);
        this.characterForm.patchValue({SurvivalBonus: newBonus});
        break;
      default: {

      }
    }
    this.updatePassivePerception();
  }

  onLevelChange() {
    let lvl = this.characterForm.value.level;
    let newBonus = Math.floor((lvl+3) / 4) + 1;
    this.characterForm.patchValue({proficiencyBonus: newBonus});

    this.updateProficiency();
  }

  updateInitiative() {
    this.characterForm.patchValue({initiative: this.characterForm.value.DexterityAM});
  }

  static getAbilityModifier(score) {
    score -= score % 2;
    return Math.ceil((score - 10) / 2);
  }

  updatePassivePerception() {
    let newPerception = 10 + this.characterForm.value.WisdomAM + ((this.characterForm.value.PerceptionProf) ? this.characterForm.value.proficiencyBonus : 0);
    this.characterForm.patchValue({passivePerception: newPerception});
  }
}
