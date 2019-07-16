import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth/guards/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'artist',
        loadChildren: () => import('./main/artists/artists.module').then(m => m.ArtistsModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'printer',
        loadChildren: () => import('./main/printers/printers.module').then(m => m.PrintersModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
