import { Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/_services/auth.guard';


export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
