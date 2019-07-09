import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ProductRef } from 'app/models';

export interface ProductsState extends EntityState<ProductRef> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<ProductRef> =
  createEntityAdapter<ProductRef>();

export const initialState: ProductsState =
  adapter.getInitialState({
    loading: false,
    loaded: false
  });
