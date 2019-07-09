import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { State, adapter, ArtistOrder } from './artist-orders.state';
import { EntityState } from '@ngrx/entity';

export const selectArtistOrdersState:
  MemoizedSelector<object, State> =
  createFeatureSelector<State>('artistOrders');

const { selectAll } = adapter.getSelectors();

export const selectArtistOrdersLoading:
  MemoizedSelector<object, boolean> =
  createSelector(
    selectArtistOrdersState,
    state => state.loading
  );

export const selectAllArtistOrders:
  (state: EntityState<ArtistOrder>) => ArtistOrder[] =
  createSelector(
    selectArtistOrdersState,
    selectAll
  );

