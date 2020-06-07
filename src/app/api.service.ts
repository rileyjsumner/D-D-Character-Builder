import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user';
import { Character } from './character';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

const userApiUrl = 'http://localhost:6200/api/users';
const characterApiUrl = 'http://localhost:6200/api/characters';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation',  result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(userApiUrl).pipe(
      tap(user => console.log('fetched users')),
      catchError(this.handleError('getUsers', []))
    );
  }
  getUser(id: number): Observable<User> {
    const url = `${userApiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id:${id}`))
    );
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${userApiUrl}/add`, user, httpOptions).pipe(
      tap((newUser: any) => console.log(`added user with id:${newUser._id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }
  updateUser(id: any, user: User): Observable<any> {
    const url = `${userApiUrl}/edit/${id}`;
    return this.http.patch(url, user, httpOptions).pipe(
      tap(_ => console.log(`updated user id:${id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  deleteUser(id: any): Observable<User> {
    const url = `${userApiUrl}/delete/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted user id:${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(characterApiUrl).pipe(
      tap(character => console.log('fetched characters')),
      catchError(this.handleError('getCharacters', []))
    );
  }
  getCharacter(id: number): Observable<Character> {
    const url = `${characterApiUrl}/${id}`;
    return this.http.get<Character>(url).pipe(
      tap(_ => console.log(`fetched character id:${id}`))
    );
  }
  addCharacter(character: Character): Observable<Character> {
    return this.http.post<Character>(`${characterApiUrl}/add`, character, httpOptions).pipe(
      tap((newCharacter: any) => console.log(`added character with id:${newCharacter._id}`)),
      catchError(this.handleError<Character>('addCharacter'))
    );
  }
  updateCharacter(id: any, character: Character): Observable<any> {
    const url = `${characterApiUrl}/edit/${id}`;
    return this.http.patch(url, character, httpOptions).pipe(
      tap(_ => console.log(`updated character id:${id}`)),
      catchError(this.handleError<any>('updateCharacter'))
    );
  }
  deleteCharacter(id: any): Observable<Character> {
    const url = `${characterApiUrl}/delete/${id}`;
    return this.http.delete<Character>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted character id:${id}`)),
      catchError(this.handleError<Character>('deleteCharacter'))
    );
  }
}
