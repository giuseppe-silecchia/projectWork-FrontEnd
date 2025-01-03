import {Injectable} from '@angular/core';
import {SignIn} from '../models/signIn';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl+"/api";

  constructor(private http: HttpClient) {
  }


  register(signIn: SignIn): Observable<Object> {
    return this.http.post(`${this.baseUrl}/register`, signIn)
  }


}
