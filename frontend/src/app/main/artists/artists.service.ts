import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ArtistService {
  products = [];
  products$ = new Subject();

  insertProduct(product: any) {
    this.products = [...this.products, product];
    this.products$.next(this.products);
  }

  deleteProduct(productToDelete: any) {
    this.products = this.products.filter(product => product.id !== productToDelete.id);
    this.products$.next(this.products);
  }

  updateProduct(productToDelete: any) {
    this.products = this.products.filter(product => product.id !== productToDelete.id);
    this.products = [...this.products, productToDelete];
    this.products$.next(this.products);
  }
}
