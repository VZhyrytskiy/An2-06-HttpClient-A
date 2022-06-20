import { Injectable } from '@angular/core';
import { Router, type Resolve, type ActivatedRouteSnapshot  } from '@angular/router';
import { type Observable, of, EMPTY, catchError, take, switchMap, delay, finalize } from 'rxjs';

import { UserModel } from './../models/user.model';
import { UserArrayService } from './../services/user-array.service';
import { SpinnerService } from './../../widgets';

@Injectable({
  providedIn: 'any'
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private userArrayService: UserArrayService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
    console.log('UserResolve Guard is called');

    if (!route.paramMap.has('userID')) {
      return of(new UserModel(null, '', ''));
    }

    this.spinner.show();
    const id = route.paramMap.get('userID')!;

    return this.userArrayService.getUser(id).pipe(
      delay(2000),
      switchMap((user: UserModel) => {
        if (user) {
          return of(user);
        } else {
          this.router.navigate(['/users']);
          return EMPTY;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return EMPTY;
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
