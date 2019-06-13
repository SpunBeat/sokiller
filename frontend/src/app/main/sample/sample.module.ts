import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { SampleService } from './sample.service';
import { EffectsModule } from '@ngrx/effects';
import { SampleEffects } from './effects/sample.effects';

const routes = [
  {
    path: '',
    component: SampleComponent
  }
];

@NgModule({
  declarations: [SampleComponent],
  exports: [SampleComponent],
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,

    // firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    // ngrx
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([SampleEffects])
  ],
  providers: [
    { provide: FirestoreSettingsToken, useValue: {} },
    SampleService
  ]
})
export class SampleModule { }
