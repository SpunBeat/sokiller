import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { AppService } from 'app/app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { SingletonService } from 'app/singleton.service';
import { ArtistOrdersActions } from '.';

@Injectable()
export class ArtistOrdersEffects {

  singleton = SingletonService.getInstance();

  constructor(
    private actions$: Actions,
    private app: AppService,
    private snackBar: MatSnackBar
  ) { }

  /**
  * triggers when someone dispatchs a [loadArtistOrders]
  */
  loadArtistOrders$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistOrdersActions.LoadArtistOrders),
      mergeMap(() =>
        this.app.get('/orders/pending').pipe(
          map((response: any) =>
            ArtistOrdersActions.LoadArtistOrdersSuccess({ payload: response.orders })
          ),
          catchError((httpError: HttpErrorResponse) => {
            this.snackBar.open(`Can't Load Info from the API. Please verify your connection`, 'Ok', { duration: 3000 });
            return of(ArtistOrdersActions.LoadArtistOrdersFailure({ errorMessage: httpError.message }));
          })
        )
      )
    )
  );


}
