import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { AppService } from 'app/app.service';
import { uniqBy } from 'lodash';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-artist-orders',
  templateUrl: './artist-orders.component.html',
  styleUrls: ['./artist-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ArtistOrdersComponent implements OnInit {

  file: any;

  dataSource = [];
  paidOutSource = [];
  paymentProcessSource = [];
  displayedColumns = ['product', 'soldUnits', 'earnings', 'selected'];
  displayedColumnsPaymentProcess = ['product', 'soldUnits', 'earnings', 'paymentCreated', 'paymentDate'];
  displayedColumnsPaidOut = ['product', 'soldUnits', 'earnings', 'paymentDate'];

  factura = 0;
  iva = 0;
  subtotal = 0;

  constructor(private app: AppService) { }

  ngOnInit(): void {
    this.app.get('/orders/pending').subscribe((response: any) => {
      const orders = [...response.orders];
      const products = orders.map(order => ({
        ...order.productRef, soldUnits: 0, earnings: 0, selected: false
      }));
      const p = uniqBy(products, e => e._id);

      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < p.length; j++) {
          if (orders[i].productRef._id === p[j]._id) {
            p[j].soldUnits += 1;
          }
        }
      }
      const productsReady = p.map(product => {
        return {
          ...product,
          earnings: product.soldUnits * product.earning
        };
      });
      this.dataSource = productsReady;
      console.log(productsReady);
    });

    this.app.get('/orders/paidOut').subscribe((response: any) => {
      const orders = [...response.orders];
      const products = orders.map(order => ({
        ...order.productRef, soldUnits: 0, earnings: 0, selected: false, orderRef: order._id
      }));
      const p = uniqBy(products, e => e._id);

      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < p.length; j++) {
          if (orders[i].productRef._id === p[j]._id) {
            p[j].soldUnits += 1;
          }
        }
      }
      const productsReady = p.map(product => {
        return {
          ...product,
          earnings: product.soldUnits * product.earning
        };
      });
      this.paidOutSource = productsReady;

      this.app.get('/payments/paidOut').subscribe((paymentProcess: any) => {
        const { payments } = paymentProcess;
        for (const payment of payments) {
          for (const orderId of payment.relatedOrders) {
            for (const product of productsReady) {
              if (orderId === product.orderRef) {
                product.paymentDate = payment.paymentDate;
                product.paymentCreated = payment.created;
              }
            }
          }
        }

      });
    });

    this.app.get('/orders/paymentProcess').subscribe((response: any) => {
      const orders = [...response.orders];
      const products = orders.map(order => ({
        ...order.productRef, soldUnits: 0, earnings: 0, selected: false, orderRef: order._id
      }));
      const p = uniqBy(products, e => e._id);

      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < p.length; j++) {
          if (orders[i].productRef._id === p[j]._id) {
            p[j].soldUnits += 1;
          }
        }
      }
      const productsReady = p.map(product => {
        return {
          ...product,
          earnings: product.soldUnits * product.earning
        };
      });
      this.paymentProcessSource = productsReady;
      this.app.get('/payments/paymentProcess').subscribe((paymentProcess: any) => {
        const { payments } = paymentProcess;
        for (const payment of payments) {
          for (const orderId of payment.relatedOrders) {
            for (const product of productsReady) {
              if (orderId === product.orderRef) {
                product.paymentDate = payment.paymentDate;
                product.paymentCreated = payment.created;
              }
            }
          }
        }
      });
    });

  }


  changeFactura(event: MatCheckboxChange, amount: any) {
    const { checked } = event;
    if (checked) {
      this.factura += amount;
    } else {
      this.factura -= amount;
    }
    this.iva = this.factura * 0.16;
    this.subtotal = this.factura * 0.84;
  }

  loadFile(event: any) {
    if (event.target.files.length) {
      this.file = event.target.files[0];
    }
  }
}
