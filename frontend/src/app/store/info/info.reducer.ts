import { createReducer, on, Action } from '@ngrx/store';
import * as InfoApiActions from './info.actions';
import { initialState, InfoState } from './info.state';


const infoReducer = createReducer(
  initialState,
  on(
    InfoApiActions.Login,
    state => ({ ...state, loading: true, loggedIn: false, hasError: false })
  ),
  on(
    InfoApiActions.LoginSuccess,
    (state, { user }) => ({ ...state, loading: false, loggedIn: true, hasError: false, user: user })
  ),
  on(
    InfoApiActions.LoginFailure,
    (state, { errorMessage }) => ({ ...state, loading: false, loggedIn: false, hasError: true, errorMessage })
  ),
  on(
    InfoApiActions.Logout,
    state => ({ ...state, loading: true, loggedIn: true, hasError: false })
  ),
  on(
    InfoApiActions.LogoutSuccess,
    state => ({ ...state, loading: false, loggedIn: false, hasError: false })
  ),
  on(
    InfoApiActions.LogoutFailure,
    state => ({ ...state, loading: false, loggedIn: true, hasError: true })
  ),
);

export function reducer(state: InfoState | undefined, action: Action) {
  return infoReducer(state, action);
}

