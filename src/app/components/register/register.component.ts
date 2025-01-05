import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {SignIn} from '../../models/signIn';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerComponent, NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, NgxSpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  signIn: SignIn = <SignIn>{};

  constructor(private router: Router, private authService: AuthService, private toasterService: ToastrService, private loaderService: NgxSpinnerService) {
  }

  submitRegister(registerForm: NgForm): void {
    if (registerForm.invalid) return;

    this.loaderService.show();
    this.authService.register(this.signIn).subscribe({
      next: () => {
        this.loaderService.hide();
        registerForm.resetForm();
        this.toasterService.success(
          "Verrai reindirizzato alla login.", "Registrazione effettuata!", {timeOut: 2000})
          .onHidden.subscribe(() => this.goToLogin());
      },
      error: (error: any) => {
        this.loaderService.hide();
        if (error.status === 400) {
          this.toasterService.error("Utente già registrato!", "Errore")
        } else this.toasterService.error("Errore! Riprovare.", "Errore");
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }
}
