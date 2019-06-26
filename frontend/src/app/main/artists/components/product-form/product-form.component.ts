import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtistService } from '../../artists.service';
import { SingletonService } from 'app/singleton.service';
import { HttpClient } from '@angular/common/http';

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

  singleton = SingletonService.getInstance();

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _artists: ArtistService,
    private http: HttpClient) { }

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
    const formData = new FormData();
    formData.append('file', file.obj.file);
    fetch(`${this.singleton.url}/admin/products/upload`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then((response: any) => {
        this.images[file.name] = {
          ...file.obj,
          customSrc: response.customSrc,
          file: {
            lastModified: file.obj.file.lastModified,
            name: file.obj.file.name,
            size: file.obj.file.size,
            type: file.obj.file.type,
          }
        };
      });
  }

  save() {
    const payload = {
      ...this.productFormGroup.value,
      id: '_' + Math.random().toString(36).substr(2, 9),
      images: this.images,
      printPrice: this.printPrice,
      iva: this.iva,
      total: this.total
    };
    this.http.post(`${this.singleton.url}/products`, payload)
      .subscribe((data) => {
        this._artists.insertProduct(payload);
        this.dialogRef.close();
      });
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
