import { ActionReducerMap } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { itemsReducer } from './items.reducer';


export const reducers: ActionReducerMap<any> = {
  count: counterReducer,
  items: itemsReducer
};
