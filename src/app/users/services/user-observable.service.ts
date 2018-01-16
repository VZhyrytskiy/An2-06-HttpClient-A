import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';

import { User } from './../models/user.model';
import { UsersAPI } from '../users.config';

@Injectable()
export class UserObservableService {

  constructor(
    private http: HttpClient,
    @Inject(UsersAPI) private usersUrl: string
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
        .pipe(
          map( this.handleData ),
          catchError( this.handleError )
        );
  }

  getUser(id: number): Observable<User> {
    return this.http.get(`${this.usersUrl}/${id}`)
        .pipe(
          map(this.handleData),
          catchError(this.handleError)
        );
  }

  updateUser(user: User) {

  }

  createUser(user: User) {

  }

  deleteUser(user: User) {

  }

  private handleData(response: HttpResponse<User>) {
    const body = response;
    return body || {};
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    else {
      errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
    }

    console.error(errorMessage);
    return _throw(errorMessage);
  }
}
