import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';

import { Observable, throwError, catchError, retry, share, concatMap } from 'rxjs';

import { UserModel } from './../models/user.model';
import { UsersAPI } from './../users.config';

@Injectable({
  providedIn: 'any'
})
export class UserObservableService {
  constructor(
    private http: HttpClient,
    @Inject(UsersAPI) private usersUrl: string
  ) {}

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersUrl).pipe(
      retry(3),
      share(),
      catchError(this.handleError)
    );
  }

  getUser(id: number | string): Observable<UserModel> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.get<UserModel>(url).pipe(
      retry(3),
      share(),
      catchError(this.handleError)
    );
  }

  updateUser(user: UserModel): Observable<UserModel> {
    const url = `${this.usersUrl}/${user.id}`;
    const body = JSON.stringify(user);

    return this.http
      .put<UserModel>(url, body)
      .pipe(catchError(this.handleError));
  }

  createUser(user: UserModel): Observable<UserModel> {
    const url = this.usersUrl;
    const body = JSON.stringify(user);

    return this.http
      .post<UserModel>(url, body)
      .pipe(catchError(this.handleError));
  }

  deleteUser(user: UserModel): Observable<UserModel[]> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete(url).pipe(
      concatMap(() => this.getUsers()),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
