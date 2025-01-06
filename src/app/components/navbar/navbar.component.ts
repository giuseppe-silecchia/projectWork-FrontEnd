import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../services/models/user.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgbCollapse, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;

  isAdmin: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private toasterService: ToastrService, private router: Router,) {
  }

  ngOnInit() {
    this.checkIfUserIsAdmin();
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  logout(): void {
    this.authService.signOut();
    this.router.navigate(['login']);
    this.toasterService.info('Logout effettuato!');
  }

  goToBookPage(): void {
    this.router.navigate(['prenota']);
  }

  goToReservationPage(): void {
    this.router.navigate(['prenotazioni']);
  }

  goToProfile(): void {
    this.router.navigate(['profilo']);
  }

  currentRoute(route: String): boolean {
    return this.router.url === route;
  }

  goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  private checkIfUserIsAdmin() {
    this.userService.getSelfInformation().subscribe(user => {
      this.isAdmin = user.isAdmin;
    });
  }
}
