import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

import { AppService } from 'app/app.service';
import { ArtistsComponent } from './artists.component';
import { ArtistProductsComponent } from './components/artist-products/artist-products.component';
import { ArtistOrdersComponent } from './components/artist-orders/artist-orders.component';
import { ArtistInfoComponent } from './components/artist-info/artist-info.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ShirtImgComponent } from './components/shirt-img/shirt-img.component';
import { ArtistService } from './artists.service';
import { ProductsStoreModule } from '../../store/products/products-store.module';
import { InfoStoreModule } from '../../store/info/info-store.module';
import { ArtistOrdersStoreModule } from 'app/store/artistOrders';

const routes = [
  {
    path: '',
    component: ArtistsComponent,
    children: [
      {
        path: 'products',
        component: ArtistProductsComponent
      },
      {
        path: 'info',
        component: ArtistInfoComponent
      },
      {
        path: 'orders',
        component: ArtistOrdersComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    ArtistsComponent,
    ArtistProductsComponent,
    ArtistInfoComponent,
    ArtistOrdersComponent,
    ProductFormComponent,
    ShirtImgComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    // ngrx
    ProductsStoreModule,
    InfoStoreModule,
    ArtistOrdersStoreModule
  ],
  exports: [],
  providers: [AppService, ArtistService],
  entryComponents: [ProductFormComponent]
})
export class ArtistsModule { }
