import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArtistService } from '../../artists.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductFormComponent implements OnInit {
  productTypes = [
    { name: 'Playera', value: 1 },
    { name: 'Taza', value: 2 }
  ];
  productFormGroup: FormGroup;
  printPrice = 175;
  iva = 0;
  subtotal = 0;
  total = 0;
  images = {
    front: {
      file: undefined,
      customSrc: undefined
    },
    back: {
      file: undefined,
      customSrc: undefined
    }
  };

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _artists: ArtistService) { }

  ngOnInit(): void {
    this.productFormGroup = this._formBuilder.group({
      name: [this.data.name ? this.data.name : '', Validators.required],
      type: [this.data.type ? this.data.type : '', Validators.required],
      earning: [this.data.earning ? this.data.earning : '', Validators.required]
    });
    if (this.data.images) {
      this.images = this.data.images;
    }
    if (this.data.iva) {
      this.iva = this.data.iva;
    }
    if (this.data.subtotal) {
      this.subtotal = this.data.subtotal;
    }
    if (this.data.total) {
      this.total = this.data.total;
    }
    this.productFormGroup.get('earning').valueChanges.subscribe(newValue => {
      const earning = +newValue;
      this.subtotal = this.printPrice + earning;
      this.iva = this.subtotal * 0.16;
      this.total = this.subtotal + this.iva;
    });
  }

  onFileChange(file: any) {
    this.images[file.name] = file.obj;
  }

  save() {
    const payload = this.productFormGroup.value;
    this._artists.insertProduct({
      ...payload,
      id: '_' + Math.random().toString(36).substr(2, 9),
      images: this.images,
      printPrice: this.printPrice,
      iva: this.iva,
      total: this.total
    });
    this.dialogRef.close();
  }

  update() {
    const payload = this.productFormGroup.value;
    this._artists.updateProduct({
      ...payload,
      id: this.data.id,
      images: this.images,
      printPrice: this.printPrice,
      iva: this.iva,
      total: this.total
    });
    this.dialogRef.close();

  }
}
