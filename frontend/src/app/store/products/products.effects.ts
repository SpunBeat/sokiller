import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { AppService } from 'app/app.service';
import { ProductRef } from 'app/models';
import * as ProductsApiActions from './products.actions';

@Injectable()
export class ProductsEffects {
  /**
   * triggers when someone dispatchs a [LoadProducts]
   */
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsApiActions.LoadProducts),
      mergeMap(() =>
        this.app.get('/products').pipe(
          map((response: { products: ProductRef[] }) =>
            ProductsApiActions.LoadProductsSuccess({ products: response.products })
          ),
          catchError((httpError: HttpErrorResponse) => {
            this.snackBar.open(`Can't load the API. Please verify your connection`, 'Ok', { duration: 3000 });
            return of(ProductsApiActions.LoadProductsFailure({ error: httpError.message }));
          })
        )
      )
    )
  );

  /**
   * triggers when someone dispatchs a [CreateProduct]
   */
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsApiActions.CreateProduct),
      mergeMap(({ payload }) => {
        return this.app.post(`/products`, payload).pipe(
          tap(response => {
            console.log(response);
          }),
          map((response: { product: ProductRef }) =>
            ProductsApiActions.CreateProductSuccess({ product: response.product })
          ),
          catchError((httpError: HttpErrorResponse) => {
            this.snackBar.open(`Can't load the API. Please verify your connection`, 'Ok', { duration: 3000 });
            return of(ProductsApiActions.CreateProductFailure({ error: httpError.message }));
          })
        );
      }
      )
    )
  );

  /**
  * triggers when someone dispatchs a [UpdateProduct]
  */
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsApiActions.UpdateProduct),
      mergeMap(({ payload, id }) =>
        this.app.patch(`/product/${id}`, payload).pipe(
          map((response: { product: ProductRef }) =>
            ProductsApiActions.UpdateProductSuccess({ product: response.product })
          ),
          catchError((httpError: HttpErrorResponse) => {
            this.snackBar.open(`Can't load the API. Please verify your connection`, 'Ok', { duration: 3000 });
            return of(ProductsApiActions.UpdateProductFailure({ error: httpError.message }));
          })
        )
      )
    )
  );

  /**
    * triggers when someone dispatchs a [DeleteProduct]
    */
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsApiActions.DeleteProduct),
      mergeMap(({ id }) =>
        this.app.delete(`/product/${id}`).pipe(
          map((response: { product: ProductRef }) =>
            ProductsApiActions.DeleteProductSuccess({ id: response.product.id })
          ),
          catchError((httpError: HttpErrorResponse) => {
            this.snackBar.open(`Can't load the API. Please verify your connection`, 'Ok', { duration: 3000 });
            return of(ProductsApiActions.DeleteProductFailure({ error: httpError.message }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private app: AppService,
    private snackBar: MatSnackBar
  ) { }
}
