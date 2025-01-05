import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userEndpoint = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {
  }

  getSelfInformation(): Observable<User> {
    return this.http.get<User>(`${this.userEndpoint}/me`);
  }

  updateSelfInformation(user: User): Observable<Object> {
    console.log(user.password);
    return this.http.patch(`${this.userEndpoint}/me`, user);
  }
}