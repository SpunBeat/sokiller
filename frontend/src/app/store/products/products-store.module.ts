
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products.effects';
import * as fromProducts from './products.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('products', fromProducts.reducer),
    EffectsModule.forFeature([ProductsEffects])
  ]
})
export class ProductsStoreModule { }
