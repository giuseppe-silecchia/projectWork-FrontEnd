import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userEndpoint = environment.apiUrl + '/users';
  private storageAdminKey = "isAdmin";
  private isAdmin: boolean = false;

  /*
  *  Il costruttore recuper il valore del ruolo di amministratore dal localStorage
  * */
  constructor(private http: HttpClient) {
    const storedValue = localStorage.getItem(this.storageAdminKey);
    this.isAdmin = storedValue ? JSON.parse(storedValue) : false;
  }

  /*
  *  Recupera le informazioni dell'utente autenticato (/me)
  *  e aggiorna il valore del ruolo di amministratore nel localStorage.
  * */
  getSelfInformation(): Observable<User> {
    return this.http.get<User>(`${this.userEndpoint}/me`).pipe(
      tap(user => this.updateStoredAdminValue(user))    // Chiamata per aggiornare lo user salvato
    );
  }

  /*
  *  Restituisce se l'utente è amministratore basandosi sul valore memorizzato.
  * */
  userIsAdmin(): boolean {
    return this.isAdmin;
  }

  /*
  * Aggiorna il ruolo dell'utente come amministratore e memorizza il valore in localStorage
  * */
  private updateStoredAdminValue(user: User) {
    this.isAdmin = user.isAdmin
    localStorage.setItem(this.storageAdminKey, JSON.stringify(user.isAdmin));
  }

  /*
  *  Permette all'utente di aggiornare le proprie informazioni personali.
  *  Il metodo effettua una richiesta HTTP di tipo PATCH(aggiornamento parziale)
  *  con le informazioni da aggiornare
  * */
  updateSelfInformation(user: User): Observable<Object> {
    return this.http.patch(`${this.userEndpoint}/me`, user);
  }

  /*
  * Recupera la lista di tutti gli utenti registrati.
  * */
  getSystemUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userEndpoint}`);
  }

  /*
  * Permette di aggiornare il ruolo di amministratore di un utente
  *
  * */
  makeUserAdmin(user: User, toAdmin: boolean): Observable<any> {
    user.isAdmin = toAdmin;
    return this.http.patch<User>(`${this.userEndpoint}/${user.id}`, user);
  }
}
