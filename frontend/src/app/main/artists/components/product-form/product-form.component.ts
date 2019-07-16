import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingletonService } from 'app/singleton.service';
import { Store } from '@ngrx/store';
import { CreateProduct, UpdateProduct, DeleteProduct } from '../../../../store';

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
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.productFormGroup = this._formBuilder.group({
      _id: [this.data._id ? this.data._id : ''],
      name: [this.data.name ? this.data.name : '', Validators.required],
      type: [this.data.type ? this.data.type : '', Validators.required],
      earning: [this.data.earning ? this.data.earning : '', Validators.required]
    });
    if (this.data.images) {
      // ** Important to generate an independient Input
      this.images = {
        back: {
          customSrc: this.data.images && this.data.images.back ? this.data.images.back.customSrc : '',
          file: this.data.images && this.data.images.back ? this.data.images.back.file : ''
        },
        front: {
          customSrc: this.data.images && this.data.images.front ? this.data.images.front.customSrc : '',
          file: this.data.images && this.data.images.front ? this.data.images.front.file : ''
        },
      };
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
    if (file.obj.file) {
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
    delete payload._id;
    this.store.dispatch(CreateProduct({ payload }));
    this.dialogRef.close();
  }

  update() {
    const payload = {
      ...this.productFormGroup.value,
      id: this.data.id,
      images: this.images,
      printPrice: this.printPrice,
      iva: this.iva,
      total: this.total
    };
    this.store.dispatch(UpdateProduct({ payload, id: payload._id }));
    this.dialogRef.close();
  }

  delete() {
    this.store.dispatch(DeleteProduct({
      id: this.productFormGroup.get('_id').value
    }));
  }
}
