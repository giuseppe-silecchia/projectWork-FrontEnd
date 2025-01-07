import {Injectable} from '@angular/core';
import {SignIn} from '../models/signIn';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../environment';
import {LogIn} from '../models/logIn';
import {UserService} from './models/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private storageKey = "authToken";

  constructor(private http: HttpClient, private userService: UserService) {
  }

  /*
  * "Invia le credenziali di login tramite una richiesta HTTP Di tipo POST,
  *  memorizza il token di autenticazione se presente
  *  e ottiene le informazioni dell'utente (chiamando il servizio userService)."
  * */
  login(login: LogIn): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, login).pipe(
      switchMap((response: any) => {
        if (response.access_token) {
          this.setAuthToken(response.access_token);
          return this.userService.getSelfInformation();
        }
        return response;
      }),
    );
  }

  /*
 * "Invia le informazioni di registrazione di un utente tramite una richiesta HTTP Di tipo POST
 * */
  register(signIn: SignIn): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, signIn);
  }

  /*
  * Restituisce il token di autenticazione salvato nel localStorage
  * */
  getAuthToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  /*
  * Memorizza il token di autenticazione nel localStorage.
  * */
  private setAuthToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  /*
  * Rimuove tutte le voci di localStorage, quindi effettua il logout dell'utente.
  * */
  signOut() {
    localStorage.clear();
  }
}
