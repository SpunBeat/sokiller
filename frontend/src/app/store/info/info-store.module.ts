
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InfoEffects } from './info.effects';
import * as fromInfo from './info.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('info', fromInfo.reducer),
    EffectsModule.forFeature([InfoEffects])
  ]
})
export class InfoStoreModule { }
