import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): boolean {
    const isAuthenticated = this.checkAuthentication(); // demo logic

    if (!isAuthenticated) {
      // Se non autenticato, reindirizza al login
      this.router.navigate(['/login']);
      return false;
    }
    return true; // Consenti l'accesso alla rotta
  }

  // Logica per verificare se l'utente è autenticato
  private checkAuthentication(): boolean {
    return !!this.authService.getAuthToken();
  }
}
