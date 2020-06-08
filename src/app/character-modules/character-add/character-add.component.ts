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
  abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  matcher = new CharacterErrorStateMatcher();

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
      'strengthAS' : [10, Validators.required],
      'dexterityAS' : [10, Validators.required],
      'constitutionAS' : [10, Validators.required],
      'intelligenceAS' : [10, Validators.required],
      'wisdomAS' : [10, Validators.required],
      'charismaAS' : [10, Validators.required],
      'strengthAM' : [0, Validators.required],
      'dexterityAM' : [0, Validators.required],
      'constitutionAM' : [0, Validators.required],
      'intelligenceAM' : [0, Validators.required],
      'wisdomAM' : [0, Validators.required],
      'charismaAM' : [0, Validators.required],
      'strengthST' : [0, Validators.required],
      'dexterityST' : [0, Validators.required],
      'constitutionST' : [0, Validators.required],
      'intelligenceST' : [0, Validators.required],
      'wisdomST' : [0, Validators.required],
      'charismaST' : [0, Validators.required],
      'strengthSTP' : [false, Validators.required],
      'dexteritySTP' : [false, Validators.required],
      'constitutionSTP' : [false, Validators.required],
      'intelligenceSTP' : [false, Validators.required],
      'wisdomSTP' : [false, Validators.required],
      'charismaSTP' : [false, Validators.required],
      'acrobaticsType' : ['DEX'],
      'acrobaticsBonus' : [0, Validators.required],
      'acrobaticsProf' : [false, Validators.required],
      'animalHandlingType' : ['WIS'],
      'animalHandlingBonus' : [0, Validators.required],
      'animalHandlingProf' : [false, Validators.required],
      'arcanaType' : ['INT'],
      'arcanaBonus' : [0, Validators.required],
      'arcanaProf' : [false, Validators.required],
      'athleticsType' : ['STR'],
      'athleticsBonus' : [0, Validators.required],
      'athleticsProf' : [false, Validators.required],
      'deceptionType' : ['CHA'],
      'deceptionBonus' : [0, Validators.required],
      'deceptionProf' : [false, Validators.required],
      'historyType' : ['INT'],
      'historyBonus' : [0, Validators.required],
      'historyProf' : [false, Validators.required],
      'insightType' : ['WIS'],
      'insightBonus' : [0, Validators.required],
      'insightProf' : [false, Validators.required],
      'intimidationType' : ['CHA'],
      'intimidationBonus' : [0, Validators.required],
      'intimidationProf' : [false, Validators.required],
      'investigationType' : ['INT'],
      'investigationBonus' : [0, Validators.required],
      'investigationProf' : [false, Validators.required],
      'medicineType' : ['WIS'],
      'medicineBonus' : [0, Validators.required],
      'medicineProf' : [false, Validators.required],
      'natureType' : ['INT'],
      'natureBonus' : [0, Validators.required],
      'natureProf' : [false, Validators.required],
      'perceptionType' : ['WIS'],
      'perceptionBonus' : [0, Validators.required],
      'perceptionProf' : [false, Validators.required],
      'performanceType' : ['CHA'],
      'performanceBonus' : [0, Validators.required],
      'performanceProf' : [false, Validators.required],
      'persuasionType' : ['CHA'],
      'persuasionBonus' : [0, Validators.required],
      'persuasionProf' : [false, Validators.required],
      'religionType' : ['INT'],
      'religionBonus' : [0, Validators.required],
      'religionProf' : [false, Validators.required],
      'sleightOfHandType' : ['DEX'],
      'sleightOfHandBonus' : [0, Validators.required],
      'sleightOfHandProf' : [false, Validators.required],
      'stealthType' : ['DEX'],
      'stealthBonus' : [0, Validators.required],
      'stealthProf' : [false, Validators.required],
      'survivalType' : ['WIS'],
      'survivalBonus' : [0, Validators.required],
      'survivalProf' : [false, Validators.required],
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
      'inspiration' : [1, Validators.required]
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
      case 'strength': {
        score = this.characterForm.value.strengthAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({strengthAM: am});
        break;
      }
      case 'dexterity': {
        score = this.characterForm.value.dexterityAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({dexterityAM: am});
        break;
      }
      case 'constitution': {
        score = this.characterForm.value.constitutionAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({constitutionAM: am});
        break;
      }
      case 'intelligence': {
        score = this.characterForm.value.intelligenceAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({intelligenceAM: am});
        break;
      }
      case 'wisdom': {
        score = this.characterForm.value.wisdomAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({wisdomAM: am});
        break;
      }
      case 'charisma': {
        score = this.characterForm.value.charismaAS;
        am = CharacterAddComponent.getAbilityModifier(score);
        this.characterForm.patchValue({charismaAM: am});
        break;
      }
      default: {

      }
    }
    this.updateSavingThrow(ability);
  }

  updateSavingThrow(ability) {
    let am, newBonus;
    let proficiency = this.characterForm.value.proficiencyBonus;
    switch(ability) {
      case 'strength': {
        am = this.characterForm.value.strengthAM;
        newBonus = am + ((this.characterForm.value.strengthSTP) ? proficiency : 0);
        this.characterForm.patchValue({strengthST: newBonus});
        break;
      }
      case 'dexterity': {
        am = this.characterForm.value.dexterityAM;
        newBonus = am + ((this.characterForm.value.dexteritySTP) ? proficiency : 0);
        this.characterForm.patchValue({dexterityST: newBonus});
        break;
      }
      case 'constitution': {
        am = this.characterForm.value.constitutionAM;
        newBonus = am + ((this.characterForm.value.constitutionSTP) ? proficiency : 0);
        this.characterForm.patchValue({constitutionST: newBonus});
        break;
      }
      case 'intelligence': {
        am = this.characterForm.value.intelligenceAM;
        newBonus = am + ((this.characterForm.value.intelligenceSTP) ? proficiency : 0);
        this.characterForm.patchValue({intelligenceST: newBonus});
        break;
      }
      case 'wisdom': {
        am = this.characterForm.value.wisdomAM;
        newBonus = am + ((this.characterForm.value.wisdomSTP) ? proficiency : 0);
        this.characterForm.patchValue({wisdomST: newBonus});
        break;
      }
      case 'charisma': {
        am = this.characterForm.value.charismaAM;
        newBonus = am + ((this.characterForm.value.charismaSTP) ? proficiency : 0);
        this.characterForm.patchValue({charismaST: newBonus});
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
  }

  onLevelChange() {
    let lvl = this.characterForm.value.level;
    let newBonus = Math.floor((lvl+3) / 4) + 1;
    this.characterForm.patchValue({proficiencyBonus: newBonus});

    this.updateProficiency();
  }

  static getAbilityModifier(score) {
    score -= score % 2;
    return Math.ceil((score - 10) / 2);
  }

}
