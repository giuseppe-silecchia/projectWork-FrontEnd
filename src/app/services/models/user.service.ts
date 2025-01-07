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

  constructor(private http: HttpClient) {
    const storedValue = localStorage.getItem(this.storageAdminKey);
    this.isAdmin = storedValue ? JSON.parse(storedValue) : false;
  }

  getSelfInformation(): Observable<User> {
    return this.http.get<User>(`${this.userEndpoint}/me`).pipe(
      tap(user => this.updateStoredAdminValue(user))    // Chiamata per aggiornare lo user salvato
    );
  }

  userIsAdmin(): boolean {
    return this.isAdmin;
  }

  private updateStoredAdminValue(user: User) {
    this.isAdmin = user.isAdmin
    localStorage.setItem(this.storageAdminKey, JSON.stringify(user.isAdmin));
  }

  updateSelfInformation(user: User): Observable<Object> {
    return this.http.patch(`${this.userEndpoint}/me`, user);
  }

  getSystemUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userEndpoint}`);
  }

  makeUserAdmin(user: User, toAdmin: boolean): Observable<any> {
    user.isAdmin = toAdmin;
    return this.http.patch<User>(`${this.userEndpoint}/${user.id}`, user);
  }
}
