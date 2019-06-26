import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';
import { SingletonService } from 'app/singleton.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  singleton = SingletonService.getInstance();

  constructor(
    private fb: FormBuilder,
    private app: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [true]
    });
  }

  login() {
    this.app.post(`/admin/users/login`, this.loginForm.value, { noAuth: true })
      .subscribe((response: { success: boolean, message?: string, token?: string, user?: any }) => {
        if (!response.success) {
          this.errorMessage = response.message;
        } else {
          this.singleton.jwt = response.token;
          this.singleton.user = response.user;
          this.router.navigate(['/artist/info']);
        }
      });
  }
}
