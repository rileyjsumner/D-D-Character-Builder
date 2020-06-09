
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './user-modules/users/users.component';
import { UserAddComponent } from './user-modules/user-add/user-add.component';
import { UserEditComponent } from './user-modules/user-edit/user-edit.component';
import { UserViewComponent } from './user-modules/user-view/user-view.component';

import { CharactersComponent } from './character-modules/characters/characters.component';
import { CharacterAddComponent } from './character-modules/character-add/character-add.component';
import { CharacterViewComponent } from './character-modules/character-view/character-view.component';
import { CharacterEditComponent } from './character-modules/character-edit/character-edit.component';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserAddComponent,
    UserEditComponent,
    UserViewComponent,
    CharactersComponent,
    CharacterAddComponent,
    CharacterViewComponent,
    CharacterEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
