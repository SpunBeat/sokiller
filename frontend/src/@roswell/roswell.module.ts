import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { MulticheckboxComponent } from './components/multicheckbox/multicheckbox.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MulticheckboxComponent],
  imports: [FuseSharedModule, ReactiveFormsModule],
  exports: [MulticheckboxComponent],
  providers: []
})
export class RoswellModule {}
