import { Action } from '@ngrx/store';
import { Category } from '../reducers/counter.reducer';

export enum CounterTypes {
  Increment = '[Counter Component] Increment',
  Decrement = '[Counter Component] Decrement',
  Reset = '[Counter Component] Reset',
  Load = '[Firebase Items] Load Items'
}

export class Increment implements Action {
  readonly type = CounterTypes.Increment;
  constructor(
    public id: string,
    public changes: Partial<Category>
  ) { }
}

export class Decrement implements Action {
  readonly type = CounterTypes.Decrement;
  constructor(
    public id: string,
    public changes: Partial<Category>
  ) { }
}

export class Reset implements Action {
  readonly type = CounterTypes.Reset;
  constructor(
    public id: string,
    public changes: Partial<Category>
  ) { }
}

export class Load implements Action {
  readonly type = CounterTypes.Load;
}

export type CategoryActions
= Increment
| Decrement
| Reset
| Load;
