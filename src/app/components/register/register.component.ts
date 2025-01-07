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

  /*
  * Il metodo gestisce la registrazione di un nuovo utente, eseguendo la validazione del form,
  * mostrando un indicatore di caricamento durante il processo,
  * gestendo la risposta del server per notificare all'utente l'esito della registrazione.
  * */
  submitRegister(registerForm: NgForm): void {
    if (registerForm.invalid) return;

    this.loaderService.show();
    this.authService.register(this.signIn).subscribe({ // effettua la chiamata HTTP al backend grazie all'authService
      next: () => { // la chiamata ha avuto successo
        this.loaderService.hide();
        registerForm.resetForm();
        // mostra un messaggio di successo e alla sua chiusura reindirizza l'utente al login
        this.toasterService.success(
          "Verrai reindirizzato alla login.", "Registrazione effettuata!", {timeOut: 2000})
          .onHidden.subscribe(() => this.goToLogin());
      },
      error: (error: any) => { // la chiamata ha riscontrato un errore
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
