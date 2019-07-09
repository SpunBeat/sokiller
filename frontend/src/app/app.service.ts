import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SingletonService } from './singleton.service';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  singleton = SingletonService.getInstance();

  constructor(
    private http: HttpClient,
  ) { }

  get(endpoint: string): Observable<Object> {
    return this.http.get(`${this.singleton.url}${endpoint}`);
  }

  post(endpoint: string, payload: any, config?: { noAuth?: boolean } ): Observable<Object> {
    const { noAuth } = config || { noAuth: false };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.singleton.jwt
    });
    const options = { headers: headers };
    return this.http.post(
      `${this.singleton.url}${endpoint}`,
      payload,
      !noAuth ? options : {}
    );
  }

  patch(endpoint: string, payload: any, config?: { noAuth?: boolean } ): Observable<Object> {
    const { noAuth } = config || { noAuth: false };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.singleton.jwt
    });
    const options = { headers: headers };
    return this.http.patch(
      `${this.singleton.url}${endpoint}`,
      payload,
      !noAuth ? options : {}
    );
  }

  delete(endpoint: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.singleton.jwt
    });
    const options = { headers: headers };
    return this.http.delete(`${this.singleton.url}${endpoint}`, options);
  }

  logOut() {
    try {
      this.singleton.jwt = '';
      this.singleton.user = '';
      this.singleton.isLoggedIn = false;
      return of({ success: true });
    } catch (error) {
      throwError(error);
    }
  }

}
