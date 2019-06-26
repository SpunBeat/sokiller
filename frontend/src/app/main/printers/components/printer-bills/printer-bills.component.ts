import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-printer-bills',
  templateUrl: './printer-bills.component.html',
  styleUrls: ['./printer-bills.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PrinterBillsComponent implements OnInit {

  file: any;

  deliveredDatasource = [];
  deliveredColumns = [
    'number', 'product', 'cost'
  ];

  paymentProcessDatasource = [];
  paymentProcessColumns = [
    'number', 'orders', 'payment',
    'requestDate', 'paymentDate'
  ];

  paidOutDatasource = [];
  paidOutColumns = [
    'number', 'orders', 'payment', 'paymentDate'
  ];

  factura = 0;
  iva = 0;
  subtotal = 0;

  constructor() { }

  ngOnInit(): void { }

  loadFile(event: any) {
    if (event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
}
