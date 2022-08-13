import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import * as UsersActions from './users.actions';
import {catchError, concatMap, map, of} from "rxjs";
import {LocalStorageService} from "../services/local-storage.service";
import {UsersService} from "@bluebits/users";

@Injectable()
export class UsersEffects {
  constructor(private readonly actions$: Actions,
              private localStorageService: LocalStorageService,
              private usersService: UsersService
  ) {}

  buildUserSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.buildUserSession),
      concatMap(() => {
        if (this.localStorageService.isValidToken()) {
          const userId = this.localStorageService.getUserIdFromToken;

          if (userId) {
            return this.usersService.getUser(userId)
              .pipe(
                map((userData) => {
                  return UsersActions.buildUserSessionSuccess({user: userData})
                }),
                catchError((error) => of(UsersActions.buildUserSessionFailed({error})))
              )
          } else {
            return of(UsersActions.buildUserSessionFailed({error: 'User is not authenticated'}))
          }
        } else {
          return of(UsersActions.buildUserSessionFailed({error: 'User is not authenticated'}))
        }
      })
    )
  })
}
