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
        path: 'artist',
        loadChildren: './main/artists/artists.module#ArtistsModule',
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'printer',
        loadChildren: './main/printers/printers.module#PrintersModule',
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
