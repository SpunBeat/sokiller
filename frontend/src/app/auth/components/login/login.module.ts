import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from './login.component';
import { AppService } from 'app/app.service';

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
  ],
  exports: [LoginComponent],
  providers: [AppService]
})
export class LoginModule { }
