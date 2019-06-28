import { createReducer, on, Action } from '@ngrx/store';
import * as InfoApiActions from './info.actions';

export interface InfoState {
  loading: boolean;
  loaded: boolean;
  name: string;
}

const initialState: InfoState = {
  name: '',
  loading: false,
  loaded: false
};

const infoReducer = createReducer(
  initialState,
  on(
    InfoApiActions.LoadInfo,
    state => ({ ...state, loading: true, loaded: false })
  )
);

export function reducer(state: InfoState | undefined, action: Action) {
  return infoReducer(state, action);
}
