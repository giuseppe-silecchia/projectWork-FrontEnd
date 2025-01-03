import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {SignIn} from '../../models/signIn';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  signIn: SignIn = <SignIn>{};

  constructor(private router: Router, private authService: AuthService) {
  }


  submitRegister(registerForm: NgForm): void {
    if (registerForm.invalid) return;

    this.authService.register(this.signIn).subscribe({
      next: () => { console.log('Register successfully'); },
    });
  }

  goToLogin()
    :
    void {
    this.router.navigate(['login']);
  }
}
