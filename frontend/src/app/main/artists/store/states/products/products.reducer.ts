import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { ProductRef } from 'app/main/artists/models/Product';
import * as ProductsApiActions from './products.actions';

export interface ProductsState extends EntityState<ProductRef> {
  loading: boolean;
  loaded: boolean;
}

const adapter: EntityAdapter<ProductRef> =
  createEntityAdapter<ProductRef>();

const initialState: ProductsState =
  adapter.getInitialState({
    loading: false,
    loaded: false
  });

const productReducer = createReducer(
  initialState,
  on(
    ProductsApiActions.LoadProducts,
    ProductsApiActions.CreateProduct,
    ProductsApiActions.UpdateProduct,
    ProductsApiActions.DeleteProduct,
    state => ({ ...state, loading: true, loaded: false })
  ),
  on(
    ProductsApiActions.LoadProductsSuccess,
    (state, { products }) => {
      return adapter.addAll(
        products,
        { ...state, loading: false, loaded: true }
      );
    }
  ),
  on(
    ProductsApiActions.CreateProductSuccess,
    (state, { product }) => {
      return adapter.addOne(
        product,
        { ...state, loading: false, loaded: true }
      );
    }
  ),
  on(
    ProductsApiActions.UpdateProductSuccess,
    (state, { product }) => {
      const productUpdate: Update<ProductRef> = {
        id: product.id,
        changes: {
          ...product,
        }
      };
      return adapter.updateOne(
        productUpdate,
        { ...state, loading: false, loaded: true }
      );
    }
  ),
  on(
    ProductsApiActions.DeleteProductSuccess,
    (state, { id }) => {
      return adapter.removeOne(id, { ...state, loading: false, loaded: true });
    }
  ),
  on(
    ProductsApiActions.LoadProductsFailure,
    ProductsApiActions.CreateProductFailure,
    ProductsApiActions.UpdateProductFailure,
    ProductsApiActions.DeleteProductFailure,
    state => ({ ...state, loading: false, loaded: false })
  ),
);

export function reducer(state: ProductsState | undefined, action: Action) {
  return productReducer(state, action);
}

const { selectAll } = adapter.getSelectors();
export const selectAllProducts = selectAll;
