import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'notfound', component: NotFoundComponent},
  {path: '**', redirectTo: 'notfound'} // Redirect per route non trovata
];
