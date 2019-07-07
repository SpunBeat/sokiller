import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SingletonService } from 'app/singleton.service';
import { Login } from 'app/main/artists/store/states/info/info.actions';
import { selectLoggedIn, selectErrorMessage } from 'app/main/artists/store';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage$: Observable<string>;

  singleton = SingletonService.getInstance();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.store.pipe( select(selectLoggedIn)).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/artist/info']);
      }
    });
    this.errorMessage$ = this.store.pipe(select(selectErrorMessage));
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [true]
    });
  }

  login() {
    this.store.dispatch(Login({ payload: this.loginForm.value }));
  }
}
