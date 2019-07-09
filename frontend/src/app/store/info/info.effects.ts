import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { AppService } from 'app/app.service';
import { UserInfo } from 'app/models';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import * as InfoApiActions from './info.actions';
import { SingletonService } from 'app/singleton.service';

@Injectable()
export class InfoEffects {

  singleton = SingletonService.getInstance();

  /**
  * triggers when someone dispatchs a [login]
  */
  login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(InfoApiActions.Login),
      mergeMap(({ payload }) =>
        this.app.post('/admin/users/login', payload, { noAuth: true }).pipe(
          tap((response: UserInfo) => {
            this.singleton.jwt = response.token;
            this.singleton.user = response.user;
          }),
          map((response: UserInfo) =>
            InfoApiActions.LoginSuccess({ user: response.user })
          ),
          catchError((httpError: HttpErrorResponse) => {
            this.snackBar.open(`Can't Load Info from the API. Please verify your connection`, 'Ok', { duration: 3000 });
            return of(InfoApiActions.LoginFailure({ errorMessage: httpError.message }));
          })
        )
      )
    )
  );

  loadSession$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(InfoApiActions.LoadSession),
      mergeMap(({ user }) => {
        if (user) {
          return of(InfoApiActions.LoginSuccess({ user }));
        } else {
          this.snackBar.open(`Can't Load Session. Please retry to Login`, 'Ok', { duration: 3000 });
          return of(InfoApiActions.LoginFailure({ errorMessage: '' }));
        }
      })
    )
  );

  logout$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(InfoApiActions.Logout),
      mergeMap(() =>
        this.app.logOut().pipe(
          map(() =>
            InfoApiActions.LogoutSuccess()
          ),
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private app: AppService,
    private snackBar: MatSnackBar
  ) { }
}
