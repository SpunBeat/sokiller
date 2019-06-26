import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { AppService } from 'app/app.service';
import { PrintersComponent } from './printers.component';
import { PrinterInfoComponent } from './components/printer-info/printer-info.component';

const routes = [
  {
    path: '',
    component: PrintersComponent,
    children: [
      {
        path: 'info',
        component: PrinterInfoComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    PrintersComponent,
    PrinterInfoComponent
  ],
  imports: [RouterModule.forChild(routes), FuseSharedModule],
  exports: [],
  providers: [AppService],
})
export class PrintersModule { }
