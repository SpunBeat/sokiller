import { Action } from '@ngrx/store';
import { Item } from '../reducers/items.reducer';

export enum ItemTypes {
  Load =          '[Firebase Items] Load Items',
  LoadSuccess =   '[Firebase API] Items Loaded Success',
  LoadError =     '[Firebase API] Items Loaded Error',
  SubmitItem =    '[Firebase Items] Submit Item',
  SubmitSuccess = '[Firebase Items] Submit Success',
  SubmitError =   '[Firebase Items] Submit Error',
  CallItem =      '[Firebase Items] Submit Callable Item',
  CallSuccess =   '[Firebase Items] Submit Callable Success',
  CallError =     '[Firebase Items] Submit Callable Error'
}

export class Load implements Action {
  readonly type = ItemTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ItemTypes.LoadSuccess;
  constructor(
    public payload: Item[]
  ) { }
}

export class LoadError implements Action {
  readonly type = ItemTypes.LoadError;
  readonly payload: Item[];
}

export class SubmitItem implements Action {
  readonly type = ItemTypes.SubmitItem;
  constructor(
    public itemId: string,
    public payload: Item
  ) { }
}

export class SubmitSuccess implements Action {
  readonly type = ItemTypes.SubmitSuccess;
}

export class SubmitError implements Action {
  readonly type = ItemTypes.SubmitError;
}

export class CallItem implements Action {
  readonly type = ItemTypes.CallItem;
  constructor(
    public name: string
  ) { }
}
export class CallSuccess implements Action {
  readonly type = ItemTypes.CallSuccess;
}

export class CallError implements Action {
  readonly type = ItemTypes.CallError;
}

export type ItemActions
  = Load
  | LoadSuccess
  | LoadError
  /* submit item */
  | SubmitItem
  | SubmitSuccess
  | SubmitError
  /* callable */
  | CallItem
  | CallSuccess
  | CallError;
