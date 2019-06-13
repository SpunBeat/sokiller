import { Component} from '@angular/core';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { CheckLoginResponse } from './app.interfaces';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _fuseSplashScreenService: FuseSplashScreenService,
    private router: Router,
    private app: AppService
  ) {
  }

}
