import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-printer-orders',
  templateUrl: './printer-orders.component.html',
  styleUrls: ['./printer-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations

})
export class PrinterOrdersComponent implements OnInit {

  dataSource = [];
  printedDatasource = [];
  forRecolectDatasource = [];
  displayedColumns = [
    'number', 'product', 'size', 'color',
    'view', 'files', 'cost', 'actions'
  ];
  printedColumns = [
    'number', 'product', 'size', 'color',
    'view', 'shipping', 'actions'
  ];
  forRecolectColumns = [
    'number', 'product', 'shipping'
  ];

  constructor() { }

  ngOnInit(): void { }

}
