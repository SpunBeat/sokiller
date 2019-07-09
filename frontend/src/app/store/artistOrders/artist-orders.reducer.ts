import { createReducer, on, Action } from '@ngrx/store';
import { initialState, State, adapter } from './artist-orders.state';
import { ArtistOrdersActions } from '.';

const artistOrderReducer = createReducer(
  initialState,
  on(
    ArtistOrdersActions.LoadArtistOrders,
    state => ({ ...state, loading: true, loaded: false })
  ),
  on(
    ArtistOrdersActions.LoadArtistOrdersSuccess,
    (state, { payload }) => {
      return adapter.addAll(
        payload,
        { ...state, loaded: true, loading: false }
      );
    }
  ),
  on(
    ArtistOrdersActions.LoadArtistOrdersFailure,
    state => ({ ...state, loading: false, loaded: false })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return artistOrderReducer(state, action);
}
