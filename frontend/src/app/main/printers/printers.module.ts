import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppService } from 'app/app.service';
import { PrintersComponent } from './printers.component';
import { PrinterInfoComponent } from './components/printer-info/printer-info.component';
import { PrinterOrdersComponent } from './components/printer-orders/printer-orders.component';
import { PrinterBillsComponent } from './components/printer-bills/printer-bills.component';
import { InfoStoreModule } from '../artists/store/states/info/info-store.module';

const routes = [
  {
    path: '',
    component: PrintersComponent,
    children: [
      {
        path: 'info',
        component: PrinterInfoComponent
      },
      {
        path: 'orders',
        component: PrinterOrdersComponent
      },
      {
        path: 'bills',
        component: PrinterBillsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    PrintersComponent,
    PrinterInfoComponent,
    PrinterOrdersComponent,
    PrinterBillsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,

    // ngrx
    InfoStoreModule
  ],
  exports: [],
  providers: [AppService],
})
export class PrintersModule { }
