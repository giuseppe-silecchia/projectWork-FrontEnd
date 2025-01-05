import {Injectable} from '@angular/core';
import {SignIn} from '../models/signIn';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../environment';
import {LogIn} from '../models/logIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private storageKey = "authToken";


  constructor(private http: HttpClient) {
  }

  login(login: LogIn): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, login).pipe(
      map((response: any) => {
        if (response.access_token) {
          this.setAuthToken(response.access_token);
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
    localStorage.removeItem(this.storageKey);
  }
}
