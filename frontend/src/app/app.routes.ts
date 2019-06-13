import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth/guards/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './auth/components/login/login.module#LoginModule'
  },
  {
    path: 'registro',
    loadChildren: './auth/components/register/register.module#RegisterModule'
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'sample',
        loadChildren: './main/sample/sample.module#SampleModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'users',
        loadChildren: './main/users/users.module#UsersModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'artist',
        loadChildren: './main/artists/artists.module#ArtistsModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
