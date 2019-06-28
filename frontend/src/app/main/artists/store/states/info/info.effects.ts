import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AppService } from 'app/app.service';
import { UserInfo } from 'app/main/artists/models';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import * as InfoApiActions from './info.actions';

@Injectable()
export class InfoEffects {

  /**
  * triggers when someone dispatchs a [LoadInfo]
  */
  loadInfo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(InfoApiActions.LoadInfo),
      mergeMap(() =>
        this.app.get('').pipe(
          map((response: UserInfo) =>
            InfoApiActions.LoadInfoSuccess({ name: response.name })
          ),
          catchError((httpError: HttpErrorResponse) => {
            this.snackBar.open(`Can't Load Info from the API. Please verify your connection`, 'Ok', { duration: 3000 });
            return of(InfoApiActions.LoadInfoFailure({ error: httpError.message }));
          })
        )
      )
    )
  );

  /**
  * triggers when someone dispatchs a [UpdateInfo]
  */
  updateInfo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(InfoApiActions.UpdateInfo),
      mergeMap(() =>
        this.app.get('').pipe(
          map((response: UserInfo) =>
            InfoApiActions.UpdateInfoSuccess({ name: response.name })
          ),
          catchError((httpError: HttpErrorResponse) => {
            this.snackBar.open(`Can't Update the Info from the API. Please verify your connection`, 'Ok', { duration: 3000 });
            return of(InfoApiActions.UpdateInfoFailure({ error: httpError.message }));
          })
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
