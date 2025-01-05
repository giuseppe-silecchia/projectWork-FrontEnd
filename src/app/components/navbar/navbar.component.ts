import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [
    NgbCollapse
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapsed = false;

  constructor(private authService: AuthService, private toasterService: ToastrService, private router: Router,) {
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

  currentRoute(route: String): boolean {
    return this.router.url === route;
  }

}
