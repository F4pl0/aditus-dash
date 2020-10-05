import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth/components/auth/auth.component';
import {AuthGuardService} from './services/auth-guard.service';
import {NotAuthGuardService} from './services/not-auth-guard.service';
import {RootComponent} from './machines/components/root/root.component';

const routes: Routes = [
  {
    path: 'machines',
    loadChildren: () => import('./machines/machines.module').then( m => m.MachinesModule ),
    component: RootComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [NotAuthGuardService]
  },
  {
    path: '**',
    redirectTo: '/auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
