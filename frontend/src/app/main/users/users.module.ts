import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { AppService } from 'app/app.service';
import { UsersComponent } from './users.component';

const routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [UsersComponent],
  imports: [RouterModule.forChild(routes), TranslateModule, FuseSharedModule],
  exports: [UsersComponent],
  providers: [ AppService ]
})
export class UsersModule {}
