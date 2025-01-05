import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {LogIn} from '../../models/logIn';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerComponent, NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  imports: [
    NgIf,
    FormsModule,
    NgxSpinnerComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logIn: LogIn = <LogIn>{};

  constructor(private router: Router, private authService: AuthService, private toasterService: ToastrService, private loaderService: NgxSpinnerService) {
  }


  submitLogin(loginForm: NgForm): void {
    if (loginForm.invalid) return;

    this.loaderService.show();
    this.authService.login(this.logIn).subscribe({
      next: () => {
        this.loaderService.hide();
        loginForm.resetForm();
        this.goToHome();
        this.toasterService.success("", "Accesso effettuato!", {timeOut: 2000});
      },
      error: (error: any) => {
        this.loaderService.hide();
        if (error.status === 401) {
          this.toasterService.error("Credenziali Errate!", "Errore");
        } else this.toasterService.error("Errore! Riprovare.", "Errore");
      }
    });
  }

  goToRegister(): void {
    this.router.navigate(['register']);
  }

  goToHome(): void {
    this.router.navigate(['']);
  }
}
