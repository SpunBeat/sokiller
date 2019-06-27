import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProducts from './states/products/products.reducer';
export * from './states/products/products.actions';

/**
 * Selector for [products] Feature
 */
const selectProductsState =
  createFeatureSelector<fromProducts.ProductsState>('products');

/**
 * Select all products from [products] state
 */
export const selectAllProducts = createSelector(
  selectProductsState,
  fromProducts.selectAllProducts
);
