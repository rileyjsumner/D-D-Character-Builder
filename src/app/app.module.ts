
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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CharactersComponent } from './character-modules/characters/characters.component';
import { CharacterAddComponent } from './character-modules/character-add/character-add.component';
import { CharacterViewComponent } from './character-modules/character-view/character-view.component';
import { CharacterEditComponent } from './character-modules/character-edit/character-edit.component';

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
    NoopAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
