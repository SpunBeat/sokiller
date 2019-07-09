import { Action, createReducer, on } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ProductRef } from 'app/models/Product';
import * as ProductsApiActions from './products.actions';
import { initialState, adapter, ProductsState } from './products.state';

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
