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

  register(signIn: SignIn): Observable<Object> {
    return this.http.post(`${this.baseUrl}/register`, signIn);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  private setAuthToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  signOut() {
    localStorage.clear();
  }
}
