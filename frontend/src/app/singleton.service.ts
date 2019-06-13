import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class SingletonService {
  private static _instance: SingletonService = new SingletonService();

  public raw = environment.raw;
  public jwt = '';
  public showSpin = false;
  public url = `${this.raw}api`;
  public uploads = `${this.raw}uploads`;
  private _user: any;

  _isLoggedIn: boolean;
  redirectUrl = '';

  public static getInstance(): SingletonService {
    return SingletonService._instance;
  }

  constructor() {
    if (SingletonService._instance) {
      throw new Error('Utiliza SingletonService.getInstance()');
    }
    SingletonService._instance = this;
  }

  public set user(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this._user = user;
    if (user !== null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  public get user(): any {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      return null;
    } else {
      this._user = user;
      return this._user;
    }
  }

  public set isLoggedIn(isLoggedIn: any) {
    this._isLoggedIn = isLoggedIn;
    if (isLoggedIn === true) {
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    } else {
      const localIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
      if (localIsLoggedIn) {
        localStorage.removeItem('isLoggedIn');
      }
    }
  }

  public get isLoggedIn(): any {
    const localIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (localIsLoggedIn) {
      this._isLoggedIn = true;
      return true;
    } else {
      return null;
    }
  }
}
