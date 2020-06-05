import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: {title: 'View Users'}
  },
  {
    path: 'users/:id',
    component: UserViewComponent,
    data: {title: 'View User'}
  },
  {
    path: 'users/add',
    component: UserAddComponent,
    data: {title: 'Add User'}
  },
  {
    path: 'users/edit',
    component: UserEditComponent,
    data: {title: 'Edit User'}
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
