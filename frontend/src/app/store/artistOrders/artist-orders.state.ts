import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ArtistOrder {
  name: string;
}

export interface State extends EntityState<ArtistOrder> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<ArtistOrder> =
  createEntityAdapter<ArtistOrder>();

export const initialState: State =
  adapter.getInitialState({
    loading: false,
    loaded: false
  });
