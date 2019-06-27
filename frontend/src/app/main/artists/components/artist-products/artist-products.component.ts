import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { ProductFormComponent } from '../product-form/product-form.component';
import { selectAllProducts, LoadProducts } from '../../store';

@Component({
  selector: 'app-artist-products',
  templateUrl: './artist-products.component.html',
  styleUrls: ['./artist-products.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ArtistProductsComponent implements OnInit {
  dialogRef: any;
  products = [];

  constructor(
    private _matDialog: MatDialog,
    private store: Store<any>
  ) {
    this.store.pipe(select(selectAllProducts)).subscribe(products => {
      this.products = products;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(LoadProducts());
  }

  newBoard(): void {
    this.dialogRef = this._matDialog.open(ProductFormComponent, {
      panelClass: 'event-form-dialog',
      data: {}
    });
  }

  editBoard(product: any): void {
    this.dialogRef = this._matDialog.open(ProductFormComponent, {
      panelClass: 'event-form-dialog',
      data: {
        ...product
      }
    });
  }
}
