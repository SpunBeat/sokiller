import { Component } from '@angular/core';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectLoggedIn, LoadSession } from './main/artists/store';
import { SingletonService } from './singleton.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  singleton = SingletonService.getInstance();

  constructor(
    private _fuseSplashScreenService: FuseSplashScreenService,
    private router: Router,
    private store: Store<any>
  ) {

    const { user } = this.singleton;
    this.store.dispatch(LoadSession({ user }));

    this.store.pipe(select(selectLoggedIn)).subscribe((loggedIn) => {
      if (!loggedIn) {
        this.router.navigate(['/']);
      }
    });

  }

}
