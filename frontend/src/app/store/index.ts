import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProducts from './products/products.selectors';
import { InfoState } from './info/info.state';
import { ProductsState } from './products/products.state';

import * as fromInfo from './info/info.selectors';
export * from './products/products.actions';
export * from './info/info.actions';

/**
 * Selector for [products] Feature
 */
const selectProductsState =
  createFeatureSelector<ProductsState>('products');

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
  createFeatureSelector<InfoState>('info');

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
