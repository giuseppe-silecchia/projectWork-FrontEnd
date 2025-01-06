import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {RegisterComponent} from './components/register/register.component';
import {AppViewerComponent} from './components/app-viewer/app-viewer.component';
import {AuthGuard} from './guards/auth.guard';
import {BookingComponent} from './components/booking/booking.component';
import {HomeComponent} from './components/home/home.component';
import {ReservationComponent} from './components/reservation/reservation.component';
import {UserComponent} from './components/user/user.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {AdminGuard} from './guards/admin.gaurd';

export const routes: Routes = [
  {
    path: '',
    component: AppViewerComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home', // Sotto rotta
        component: HomeComponent,
      },
      {
        path: 'prenota', // Sotto rotta
        component: BookingComponent,
      },
      {
        path: 'prenotazioni', // Sotto rotta
        component: ReservationComponent
      },
      {
        path: 'profilo', // Sotto rotta
        component: UserComponent
      },
      {
        path: 'dashboard',  // Sotto rotta
        component: AdminDashboardComponent,
        canActivate: [AdminGuard]
      }

    ],
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'notfound', component: NotFoundComponent},
  {path: '**', redirectTo: 'notfound'} // Redirect per route non trovata
];
