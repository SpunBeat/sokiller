import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InfoStoreModule } from './info/info-store.module';
import { ProductsStoreModule } from './products/products-store.module';
import { ArtistOrdersStoreModule } from './artistOrders';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InfoStoreModule,
    ProductsStoreModule,
    ArtistOrdersStoreModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ]
})
export class RootStoreModule { }
