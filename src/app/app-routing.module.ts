import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './user-modules/users/users.component';
import { UserAddComponent } from './user-modules/user-add/user-add.component';
import { UserEditComponent } from './user-modules/user-edit/user-edit.component';
import { UserViewComponent } from './user-modules/user-view/user-view.component';
import {CharactersComponent} from './character-modules/characters/characters.component';
import {CharacterViewComponent} from './character-modules/character-view/character-view.component';
import {CharacterAddComponent} from './character-modules/character-add/character-add.component';
import {CharacterEditComponent} from './character-modules/character-edit/character-edit.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    data: {title: 'View Users'}
  },
  {
    path: 'users/add',
    component: UserAddComponent,
    data: {title: 'Add User'}
  },
  {
    path: 'users/edit/:id',
    component: UserEditComponent,
    data: {title: 'Edit User'}
  },
  {
    path: 'users/:id',
    component: UserViewComponent,
    data: {title: 'View User'}
  },
  {
    path: 'characters',
    component: CharactersComponent,
    data: {title: 'View Users'}
  },
  {
    path: 'characters/add',
    component: CharacterAddComponent,
    data: {title: 'Add Characters'}
  },
  {
    path: 'characters/edit/:id',
    component: CharacterEditComponent,
    data: {title: 'Edit Characters'}
  },
  {
    path: 'characters/:id',
    component: CharacterViewComponent,
    data: {title: 'View Characters'}
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
