import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-printer-info',
  templateUrl: './printer-info.component.html',
  styleUrls: ['./printer-info.component.scss']
})
export class PrinterInfoComponent implements OnInit {

  formGroup: FormGroup;

  /**
   * FromGroup Accesors
   */
  generalData = () => this.formGroup.get('generalData');

  generalDataAccess = () => this.generalData().get('access');
  generalDataAddress = () => this.generalData().get('address');
  generalDataInCharge = () => this.generalData().get('inCharge');
  generalDataSchedules = () => this.generalData().get('schedules');

  fiscalData = () => this.formGroup.get('fiscalData');
  bankData = () => this.formGroup.get('bankData');

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initFormGroup();
   }

  initFormGroup(): void {
    this.formGroup = this.fb.group({
      generalData: this.fb.group({
        access: this.fb.group({
          comercialName: [''],
          establishmentPhone: [''],
          email: [''],
          password: [''],
          passwordHint: ['']
        }),
        address: this.fb.group({
          state: [''],
          street: [''],
          extNum: [''],
          intNum: [''],
          postalCode: [''],
          colonia: [''],
          alcaldia: ['']
        }),
        inCharge: this.fb.group({
          name: [''],
          phone: ['']
        }),
        schedules: this.fb.group({
          days: this.fb.array([]),
          start: [''],
          end: ['']
        })
      }),
      fiscalData: this.fb.group({
        businessName: [''],
        rfc: [''],
        fiscalAddress: [''],
        email: ['']
      }),
      bankData: this.fb.group({
        bankName: [''],
        titularName: [''],
        accountNumber: [''],
        clabe: ['']
      })
    });
  }

  resetFormGroup(): void {

  }

  updateFormGroup(): void {

  }
}
