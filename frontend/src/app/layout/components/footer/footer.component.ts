import { Component } from '@angular/core';
import { AppService } from 'app/app.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  /**
   * Constructor
   */
  constructor(
    private app: AppService
  ) {
  }

  logOut() {
    this.app.logOut();
  }
}
