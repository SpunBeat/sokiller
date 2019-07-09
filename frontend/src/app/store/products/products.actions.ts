import { createAction, props } from '@ngrx/store';
import { ProductRef } from 'app/models';

/**
 * Loading Actions
 */
export const LoadProducts = createAction(
  '[Producst/API] Load Products'
);

export const LoadProductsSuccess = createAction(
  '[Producst/API] Load Producst Success',
  props<{ products: ProductRef[] }>()
);

export const LoadProductsFailure = createAction(
  '[Products/API] Load Products Failure',
  props<{ error: any }>()
);

/**
 * Create Actions
 */

export const CreateProduct = createAction(
  '[Products/API] Create Product',
  props<{ payload: any }>()
);

export const CreateProductSuccess = createAction(
  '[Products/API] Create Product Success',
  props<{ product: ProductRef }>()
);

export const CreateProductFailure = createAction(
  '[Products/API] Create Product Failure',
  props<{ error: any }>()
);

/**
 * Update Actions
 */

export const UpdateProduct = createAction(
  '[Products/API] Update Product',
  props<{ payload: any, id: string }>()
);

export const UpdateProductSuccess = createAction(
  '[Products/API] Update Product Success',
  props<{ product: ProductRef }>()
);

export const UpdateProductFailure = createAction(
  '[Products/API] Update Product Failure',
  props<{ error: any }>()
);

/**
 * Delete Actions
 */

export const DeleteProduct = createAction(
  '[Products/API] Delete Product',
  props<{ id: string }>()
);

export const DeleteProductSuccess = createAction(
  '[Products/API] Delete Product Success',
  props<{ id: string }>()
);

export const DeleteProductFailure = createAction(
  '[Products/API] Delete Product Failure',
  props<{ error: any }>()
);
