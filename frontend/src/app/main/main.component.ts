import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationSpanish } from 'app/navigation/i18n/es';
import { SingletonService } from 'app/singleton.service';

@Component({
  selector: 'app',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;

  singleton = SingletonService.getInstance();

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _translateService: TranslateService,
    private _platform: Platform
  ) {
    // Get default navigation
    this.navigation = navigation;

    // Register the navigation to the service
    this._fuseNavigationService.register('main', this.navigation);

    // Set the main navigation as our current navigation
    this._fuseNavigationService.setCurrentNavigation('main');

    // Add languages
    this._translateService.addLangs(['es', 'en']);

    // Set the default language
    this._translateService.setDefaultLang('es');

    // Set the navigation translations
    this._fuseTranslationLoaderService.loadTranslations(navigationSpanish, navigationEnglish);

    // Use a language
    this._translateService.use('es');

    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.fuseConfig = config;

      // Boxed
      if (this.fuseConfig.layout.width === 'boxed') {
        this.document.body.classList.add('boxed');
      } else {
        this.document.body.classList.remove('boxed');
      }

      // Color theme - Use normal for loop for IE11 compatibility
      for (let i = 0; i < this.document.body.classList.length; i++) {
        const className = this.document.body.classList[i];

        if (className.startsWith('theme-')) {
          this.document.body.classList.remove(className);
        }
      }

      this.document.body.classList.add(this.fuseConfig.colorTheme);
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }
}
