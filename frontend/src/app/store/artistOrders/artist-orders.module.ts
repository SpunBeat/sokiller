
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ArtistOrdersEffects } from './artist-orders.effects';
import * as fromArtistOrders from './artist-orders.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('artistOrders', fromArtistOrders.reducer),
    EffectsModule.forFeature([ArtistOrdersEffects])
  ]
})
export class ArtistOrdersStoreModule { }
