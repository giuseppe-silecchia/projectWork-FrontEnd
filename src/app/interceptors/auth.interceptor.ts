import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
    /*
    Inizializza l'interceptor con AuthService per gestire il token di autenticazione e Router per la navigazione.
    * */
  }

  /*
  * L'interceptor è progettato per intercettare tutte le richieste HTTP e aggiungere un token di autorizzazione
  * nell'intestazione delle richieste, se presente.
  * Inoltre, gestisce gli errori 401 (non autorizzato) e 422 (entità non processabile),
  * eseguendo il logout e redirigendo l'utente alla pagina di login.
  * */

  // Intercetta ogni richiesta HTTP prima che venga inviata al server
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();  // recupera il token di autenticazione

    /*Se il token è presente, clona la richiesta originale e aggiunge l'intestazione Authorization
    con il formato Bearer token*/

    if (token) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          /*Se è presente un errore di autenticazione o di validazione del token viene fatta un logout e una redirect*/
          if (err.status === 401 || err.status === 422) {
            this.authService.signOut();
            this.goToLogin();
          }
        }
        return throwError(err);
      })
    )
  }

  goToLogin(): void {
    this.router.navigate(['login']).then();
  }
}
