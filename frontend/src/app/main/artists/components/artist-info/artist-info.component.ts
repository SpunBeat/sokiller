import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss']
})
export class ArtistInfoComponent implements OnInit {

  formGroup: FormGroup;

  /**
   * FromGroup Accesors
   */
  generalData = () => this.formGroup.get('generalData');
  fiscalData = () => this.formGroup.get('fiscalData');
  bankData = () => this.formGroup.get('bankData');

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.formGroup = this.fb.group({
      generalData: this.fb.group({
        name: [''],
        phone: [''],
        email: [''],
        password: [''],
        passwordHint: ['']
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
