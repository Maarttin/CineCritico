import { Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
import { authGuard } from './services/auth.gurd';
export const routes: Routes = [
 { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path:'login',
        loadComponent:() => import('./components/login/login.component').then(m => m.Login)

    },
    {
         path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.Home),
     canActivate: [authGuard]

    },
    {
    path: 'resena/:peliculaId',
    loadComponent: () =>
      import('./components/resena/resena').then(m => m.Resena),
    canActivate: [authGuard]
  }

   
];
