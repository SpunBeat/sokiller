import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { AppService } from 'app/app.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { FirebaseModule } from 'app/modules/firebase.module';
import { RegisterComponent } from './register.component';

const routes = [
  {
    path: '',
    component: RegisterComponent
  }
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirebaseModule
  ],
  exports: [],
  providers: [AppService]
})
export class RegisterModule { }
