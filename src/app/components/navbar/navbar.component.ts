import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from '@angular/common';
import {UserService} from '../../services/models/user.service';

@Component({
  selector: 'app-navbar',
  imports: [NgbCollapse, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapsed = false;

  isAdmin: boolean = false;

  constructor(private authService: AuthService, private userSerivce: UserService, private toasterService: ToastrService, private router: Router,) {
    this.isAdmin = this.userSerivce.userIsAdmin();
  }

  /*
  * Metodo chiamato dal pulsante Logout
  * Chiama il metodo dell'authservice per procedere con il logout
  * e mostra un messaggio di stato.
  * */
  logout(): void {
    this.authService.signOut();
    this.router.navigate(['login']).then();
    this.toasterService.info('Logout effettuato!');
  }

  goToHome(): void {
    this.router.navigate(['home']).then();
  }

  goToBookPage(): void {
    this.router.navigate(['prenota']).then();
  }

  goToReservationPage(): void {
    this.router.navigate(['prenotazioni']).then();
  }

  goToProfile(): void {
    this.router.navigate(['profilo']).then();
  }

  currentRoute(route: String): boolean {
    return this.router.url === route;
  }

  goToDashboard(): void {
    this.router.navigate(['dashboard']).then();
  }
}
