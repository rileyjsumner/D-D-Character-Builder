import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

const apiUrl = 'http://localhost:6200/api/users';

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
    return this.http.get<User[]>(apiUrl).pipe(
      tap(user => console.log('fetched users')),
      catchError(this.handleError('getUsers', []))
    );
  }
  getUser(id: number): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id:${id}`))
    );
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${apiUrl}/add`, user, httpOptions).pipe(
      tap((newUser: any) => console.log(`added user with id:${newUser._id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }
  updateUser(id: any, user: User): Observable<any> {
    const url = `${apiUrl}/edit/${id}`;
    return this.http.patch(url, user, httpOptions).pipe(
      tap(_ => console.log(`updated user id:${id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  deleteUser(id: any): Observable<User> {
    const url = `${apiUrl}/delete/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted user id:${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }
}
