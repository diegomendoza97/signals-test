import { Route } from '@angular/router';
import { authGuard } from './utils/auth.guard';

export const appRoutes: Route[] = [
  {
    title: 'Home',
    path: 'home',
    canActivate: [authGuard],
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.page'),
  },
  {
    title: 'Login',
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./pages/login/login.page')
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
