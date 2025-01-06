import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): boolean {
    const isAuthenticated = this.checkAuthentication();

    if (!isAuthenticated) {
      // Se non autenticato, reindirizza al login
      this.router.navigate(['/login']);
      return false;
    }
    return true; // Consenti l'accesso alla rotta
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

  // Logica per verificare se l'utente è autenticato
  private checkAuthentication(): boolean {
    return !!this.authService.getAuthToken();
  }
}
