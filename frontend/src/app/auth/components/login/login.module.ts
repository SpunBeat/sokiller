import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from './login.component';
import { AppService } from 'app/app.service';
import { InfoStoreModule } from 'app/store/info/info-store.module';

const routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    TranslateModule,
    FuseSharedModule,
    InfoStoreModule
  ],
  exports: [LoginComponent],
  providers: [AppService]
})
export class LoginModule { }
