import { createAction, props } from '@ngrx/store';
import { User } from './info.state';

/**
 * Loading Actions
 */
export const LoadSession = createAction(
  '[Info/API] Load Session',
  props<{ user: User }>()
);

export const Login = createAction(
  '[Info/API] Login',
  props<{ payload: any }>()
);

export const LoginSuccess = createAction(
  '[Info/API] Login Success',
  props<{ user: User }>()
);

export const LoginFailure = createAction(
  '[Info/API] Login Failure',
  props<{ errorMessage: string }>()
);

export const Logout = createAction(
  '[Info/API] Logout'
);

export const LogoutSuccess = createAction(
  '[Info/API] Logout Success'
);

export const LogoutFailure = createAction(
  '[Info/API] Logout Failure'
);

