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
  name = '';
  characterClass = '';
  characterRace = '';
  isLoadingResults = false;
  matcher = new CharacterErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.characterForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'characterClass' : [null, Validators.required],
      'characterRace' : [null, Validators.required]
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

}
