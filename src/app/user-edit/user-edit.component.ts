import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormControl, FormGroupDirective, FormGroup, NgForm, Validators  } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class UserErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  id = '';
  name = '';
  email = '';
  password = '';
  isLoadingResults = false;
  matcher = new UserErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params['id']);
    this.userForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  getUser(id: any) {
    this.api.getUser(id).subscribe((data: any) => {
      this.id = data.id;
      this.userForm.setValue({
        name: data.name,
        email: data.email,
        password: data.password
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateUser(this.id, this.userForm.value)
      .subscribe((res: any) => {
        const id = res.id;
        this.isLoadingResults = false;
        this.router.navigate(['/user-view', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      })
  }

  userDetails() {
    this.router.navigate(['/user-view', this.id]);
  }

}
