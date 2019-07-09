import { createAction, props } from '@ngrx/store';
import { ArtistOrder } from './artist-orders.state';

/**
 * Loading Actions
 */
export const LoadArtistOrders = createAction(
  '[Info/API] LoadArtistOrders',
);

export const LoadArtistOrdersSuccess = createAction(
  '[Info/API] LoadArtistOrders Success',
  props<{ payload: ArtistOrder[] }>()
);

export const LoadArtistOrdersFailure = createAction(
  '[Info/API] LoadArtistOrders Failure',
  props<{ errorMessage: string }>()
);


