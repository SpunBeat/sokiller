import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProducts from './states/products/products.reducer';
import * as fromInfo from './states/info/info.reducer';
export * from './states/products/products.actions';
export * from './states/info/info.actions';

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


/**
 * Selector for [login] Feature
 */
const selectInfoState =
  createFeatureSelector<fromInfo.InfoState>('info');

export const selectUser = createSelector(
  selectInfoState,
  fromInfo.getUser
);

export const selectLoggedIn = createSelector(
  selectInfoState,
  fromInfo.getLoggedIn
);

export const selectErrorMessage = createSelector(
  selectInfoState,
  fromInfo.getErrorMessage
);
