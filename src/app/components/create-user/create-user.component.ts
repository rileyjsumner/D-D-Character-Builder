import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  visible = true;
  selectable = true;
  removeable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetUserForm') seeUserForm;
  readonly seperatorKeysCodes: number[] = [ENTER, COMMA];
  userForm: FormGroup;
  constructor(public fb: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private userApi: ApiService) {}

  ngOnInit(): void {
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
  submitUserForm() {
    if (this.userForm.valid) {
      this.userApi.AddUser(this.userForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/get-users'))
      });
    }
  }
}
