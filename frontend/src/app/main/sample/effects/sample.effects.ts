import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SampleService } from '../sample.service';
import { mergeMap, map, catchError, take, tap } from 'rxjs/operators';
import {
  LoadSuccess,
  LoadError,
  Load,
  SubmitItem,
  ItemTypes,
  SubmitSuccess,
  SubmitError,
  CallSuccess,
  CallError,
  CallItem
} from '../actions/items.actions';
import { Item } from '../reducers/items.reducer';

@Injectable()
export class SampleEffects {
  @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType(new Load().type),
    mergeMap(() =>
      this.sample.getAll().pipe(
        map((payload: Item[]) => new LoadSuccess(payload)),
        catchError(() => of(new LoadError()))
      )
    )
  );

  @Effect()
  submitItem$: Observable<Action> = this.actions$.pipe(
    ofType(ItemTypes.SubmitItem),
    mergeMap((action: SubmitItem) =>
      this.sample.submit(action.itemId, action.payload).pipe(
        take(1),
        map(() => new SubmitSuccess()),
        catchError(() => of(new SubmitError()))
      )
    )
  );

  @Effect()
  callable$: Observable<Action> = this.actions$.pipe(
    ofType(ItemTypes.CallItem),
    mergeMap((item: CallItem) =>
      this.sample.callable(item.name).pipe(
        take(1),
        map(() => new CallSuccess()),
        catchError(() => of(new CallError()))
      )
    )
  );

  constructor(private actions$: Actions, private sample: SampleService) {}
}
