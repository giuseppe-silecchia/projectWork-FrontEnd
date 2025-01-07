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

  /*
    * Il metodo gestisce il processi di login un nuovo utente, eseguendo la validazione del form,
    * mostrando un indicatore di caricamento durante il processo,
    * gestendo la risposta del server per notificare all'utente l'esito della login.
    * */
  submitLogin(loginForm: NgForm): void {
    if (loginForm.invalid) return;

    this.loaderService.show();
    this.authService.login(this.logIn).subscribe({ //Invia la richiesta di login tramite il servizio AuthService
      next: () => {
        /*
        * Se il login ha successo,
        * il loader viene nascosto, il form viene resettato,
        * l'utente viene reindirizzato alla home page
        * e infine viene mostrato un messaggio di successo
        * */
        this.loaderService.hide();
        loginForm.resetForm();
        this.goToHome();
        this.toasterService.success("", "Accesso effettuato!", {timeOut: 2000});
      },
      error: (error: any) => {
        /*
        * Gestisce gli errori durante il login.
        * Se il server restituisce un errore 401 (Credenziali errate),
        * viene mostrato un messaggio specifico per informare l'utente.
        * Altrimenti viene mostrato un messaggio di errore generico.
        * */
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
