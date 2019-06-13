import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ArtistService } from '../../artists.service';
import { AppService } from 'app/app.service';

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
    private _artists: ArtistService,
    private app: AppService
    ) { }

  ngOnInit(): void {
    this.app.get('/products').subscribe((response: any) => {
      this.products = response.products;
    });
    this._artists.products$.subscribe((products: any[]) => {
      this.products = [...products];
      console.log(this.products);
    });
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
