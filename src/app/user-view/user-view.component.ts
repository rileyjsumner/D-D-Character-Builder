import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {User} from '../user';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  user: User = { id: '', name: '', email: '', password: ''};
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUserDetails(this.route.snapshot.params.id);
  }

  getUserDetails(id: any) {
    this.api.getUser(id)
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
        this.isLoadingResults = false;
      });
  }
  deleteUser(id: any) {
    this.isLoadingResults = true;
    this.api.deleteUser(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/users']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
