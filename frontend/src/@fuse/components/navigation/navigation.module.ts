import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { FuseNavigationComponent } from './navigation.component';
import { FuseNavVerticalItemComponent } from './vertical/item/item.component';
import { FuseNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { FuseNavVerticalGroupComponent } from './vertical/group/group.component';
import { FuseNavHorizontalItemComponent } from './horizontal/item/item.component';
import { FuseNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatIconModule,
    MatRippleModule,

    TranslateModule.forChild(),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  exports: [
    FuseNavigationComponent
  ],
  declarations: [
    FuseNavigationComponent,
    FuseNavVerticalGroupComponent,
    FuseNavVerticalItemComponent,
    FuseNavVerticalCollapsableComponent,
    FuseNavHorizontalItemComponent,
    FuseNavHorizontalCollapsableComponent
  ],
  providers: [
  ]
})
export class FuseNavigationModule {
}
