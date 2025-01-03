import {Injectable} from '@angular/core';
import {SignIn} from '../models/signIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  login(): boolean {
    // Simula il login
    this.isLoggedIn = true;
    return this.isLoggedIn;
  }

  register(signIn:SignIn): void {
    console.log(signIn);
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
