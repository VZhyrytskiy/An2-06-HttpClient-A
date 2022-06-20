import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, type HttpResponse, type HttpErrorResponse} from '@angular/common/http';
import { type Observable, throwError, catchError, retry, share } from 'rxjs';

import { UsersAPI } from './../users.config';
import type { UserModel } from './../models/user.model';

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

  getUser(id: NonNullable<UserModel['id']> | string): Observable<UserModel> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.get<UserModel>(url).pipe(
      retry(3),
      share(),
      catchError(this.handleError)
    );
  }

  updateUser(user: UserModel) {}

  createUser(user: UserModel) {}

  deleteUser(user: UserModel) {}

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
