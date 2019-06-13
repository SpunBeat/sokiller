import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';


const modules = [
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireFunctionsModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }]
})
export class FirebaseModule {}
