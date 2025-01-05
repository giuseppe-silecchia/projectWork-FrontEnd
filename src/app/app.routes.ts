import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {RegisterComponent} from './components/register/register.component';
import {AppViewerComponent} from './components/app-viewer/app-viewer.component';
import {AuthGuard} from './guards/auth.guard';
import {BookingComponent} from './components/booking/booking.component';
import {HomeComponent} from './components/home/home.component';

export const routes: Routes = [
  {
    path: '', component: AppViewerComponent, canActivate: [AuthGuard], children: [
      {
        path: 'home', // Sotto rotta
        component: HomeComponent,
      },
      {
        path: 'prenota', // Sotto rotta
        component: BookingComponent,
      },
    ],
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'notfound', component: NotFoundComponent},
  {path: '**', redirectTo: 'notfound'} // Redirect per route non trovata
];
