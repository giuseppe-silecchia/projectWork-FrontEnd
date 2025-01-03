import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    // Simula l'autenticazione salvando un token
    localStorage.setItem('authToken', 'dummy-token');
    this.router.navigate(['/']); // Reindirizzamento
  }
}
