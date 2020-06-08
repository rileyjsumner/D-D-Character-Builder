
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';

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
    BrowserAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
