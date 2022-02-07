import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import type { ParamMap } from '@angular/router';

// rxjs
import { Observable, switchMap } from 'rxjs';

import type { UserModel } from './../../models/user.model';
import { UserArrayService, UserObservableService } from './../../services';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$!: Observable<Array<UserModel>>;

  private editedUser!: UserModel;

  constructor(
    private userArrayService: UserArrayService,
    private userObservableService: UserObservableService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.users$ = this.userObservableService.getUsers();

    // listen editedUserID from UserFormComponent
    const observer = {
      next: (user: UserModel) => {
        this.editedUser = { ...user };
        console.log(
          `Last time you edited user ${JSON.stringify(this.editedUser)}`
        );
      },
      error: (err: any) => console.log(err)
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.userArrayService.getUser(params.get('editedUserID')!)
        )
      )
      .subscribe(observer);
  }

  onEditUser(user: UserModel): void {
    const link = ['/users/edit', user.id];
    this.router.navigate(link);
    // or
    // const link = ['edit', user.id];
    // this.router.navigate(link, {relativeTo: this.route});
  }

  isEdited(user: UserModel): boolean {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  trackByFn(index: number, user: UserModel): number | null {
    return user.id;
  }
}
