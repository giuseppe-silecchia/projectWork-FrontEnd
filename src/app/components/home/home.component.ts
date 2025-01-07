import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/models/user.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isAdmin: boolean;

  constructor(private router: Router, private userService: UserService) {
  this.isAdmin = this.userService.userIsAdmin();
  }

  goToBookingPage() {
    this.router.navigate(['prenota']).then();
  }

  goToMyReservations() {
    this.router.navigate(['prenotazioni']).then();
  }

  goToAdminDashboard() {
    this.router.navigate(['dashboard']).then();
  }
}
