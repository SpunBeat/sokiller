import { createAction, props } from '@ngrx/store';

/**
 * Loading Actions
 */
export const LoadInfo = createAction(
  '[Info/API] Load Info'
);

export const LoadInfoSuccess = createAction(
  '[Info/API] Load Info Success',
  props<{ name: string }>()
);

export const LoadInfoFailure = createAction(
  '[Info/API] Load Info Failure',
  props<{ error: any }>()
);

/**
 * Update Actions
 */
export const UpdateInfo = createAction(
  '[Info/API] Update Info'
);

export const UpdateInfoSuccess = createAction(
  '[Info/API] Update Info Success',
  props<{ name: string }>()
);

export const UpdateInfoFailure = createAction(
  '[Info/API] Update Info Failure',
  props<{ error: any }>()
);
