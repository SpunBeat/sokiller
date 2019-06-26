import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'app/app.service';
import { SingletonService } from 'app/singleton.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-printer-info',
  templateUrl: './printer-info.component.html',
  styleUrls: ['./printer-info.component.scss']
})
export class PrinterInfoComponent implements OnInit {

  formGroup: FormGroup;
  user: any;
  singleton = SingletonService.getInstance();

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


  constructor(
    private fb: FormBuilder,
    private app: AppService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.app.post(`/admin/user/profile`, { userId: this.singleton.user._id })
      .subscribe((data: any) => {
        this.user = data.user;
        this.initFormGroup(this.user);
      });
  }

  initFormGroup(user: any): void {
    const generalData = user.generalData || {};
    const { access = {}, address = {}, inCharge = {}, schedules = {} } = generalData;
    const fiscalData = user.fiscalData || {};
    const bankData = user.bankData || {};
    this.formGroup = this.fb.group({
      generalData: this.fb.group({
        access: this.fb.group({
          comercialName: [access.comercialName],
          establishmentPhone: [access.establishmentPhone],
          email: [access.email],
          password: [access.password],
          passwordHint: [access.passwordHint]
        }),
        address: this.fb.group({
          state: [address.state],
          street: [address.street],
          extNum: [address.extNum],
          intNum: [address.intNum],
          postalCode: [address.postalCode],
          colonia: [address.colonia],
          alcaldia: [address.alcaldia]
        }),
        inCharge: this.fb.group({
          name: [inCharge.name],
          phone: [inCharge.phone]
        }),
        schedules: this.fb.group({
          days: this.fb.array([]),
          start: [schedules.start],
          end: [schedules.end]
        })
      }),
      fiscalData: this.fb.group({
        businessName: [fiscalData.businessName],
        rfc: [fiscalData.rfc],
        fiscalAddress: [fiscalData.fiscalAddress],
        email: [fiscalData.email]
      }),
      bankData: this.fb.group({
        bankName: [bankData.bankName],
        titularName: [bankData.titularName],
        accountNumber: [bankData.accountNumber],
        clabe: [bankData.clabe]
      })
    });
  }

  resetFormGroup(): void {
    this.initFormGroup(this.user);
  }

  updateFormGroup(): void {
    const payload = {
      ...this.user,
      ...this.formGroup.value
    };
    this.app.patch(`/admin/user/updateSpecificData/${this.singleton.user._id}`, payload)
      .subscribe((data: any) => {
        this.user = data.user;
        this.initFormGroup(this.user);
        this.snackBar.open(`Actualizaste tus datos`, 'OK', {
          duration: 2000,
          verticalPosition: 'top'
        });
      });
  }
}
