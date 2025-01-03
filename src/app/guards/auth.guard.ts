import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.checkAuthentication(); // demo logic

    if (!isAuthenticated) {
      // Se non autenticato, reindirizza al login
      this.router.navigate(['/login']);
      return false;
    }
    return true; // Consenti l'accesso alla rotta
  }

  // Logica per verificare se l'utente è autenticato //todo demo logic!
  private checkAuthentication(): boolean {

    const token = localStorage.getItem('authToken');
    return !!token;
  }
}
