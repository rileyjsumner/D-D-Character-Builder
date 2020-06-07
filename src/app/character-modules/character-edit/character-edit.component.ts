import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../api.service';
import {ErrorStateMatcher} from '@angular/material/core';

export class CharacterErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {

  characterForm: FormGroup;
  _id = '';
  name = '';
  characterClass = '';
  characterRace = '';
  isLoadingResults = false;
  matcher = new CharacterErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCharacter(this.route.snapshot.params['id']);
    this.characterForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'characterClass' : [null, Validators.required],
      'characterRace' : [null, Validators.required]
    });
  }

  getCharacter(id: any) {
    this.api.getCharacter(id).subscribe((data: any) => {
      this._id = data._id;
      this.characterForm.setValue({
        name: data.name,
        characterClass: data.characterClass,
        characterRace: data.characterRace
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateCharacter(this._id, this.characterForm.value)
      .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/characters/', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }

  characterDetails() {
    this.router.navigate(['/characters/', this._id]);
  }

}
