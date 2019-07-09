import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SingletonService } from 'app/singleton.service';
import { AppService } from 'app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../../../store';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss']
})
export class ArtistInfoComponent implements OnInit {

  formGroup: FormGroup;
  user: any;
  singleton = SingletonService.getInstance();

  /**
   * FromGroup Accesors
   */
  profileData = () => this.formGroup.get('profileData');
  fiscalData = () => this.formGroup.get('fiscalData');
  bankData = () => this.formGroup.get('bankData');

  constructor(
    private fb: FormBuilder,
    private app: AppService,
    private snackBar: MatSnackBar,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectUser)).subscribe(user => {
      this.user = user;
      this.initFormGroup(this.user);
    });
  }

  initFormGroup(user: any): void {
    const profileData = user.profileData;
    const fiscalData = user.fiscalData || {};
    const bankData = user.bankData || {};
    this.formGroup = this.fb.group({
      profileData: this.fb.group({
        name: [profileData.name],
        phone: [profileData.phone],
        email: [profileData.email],
        password: [profileData.password],
        passwordHint: [profileData.passwordHint]
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
