import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Room} from '../../models/room';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomsEndpoint = environment.apiUrl + '/rooms';

  constructor(private http: HttpClient) {
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsEndpoint);
  }

  getAvailableRooms(checkIn: string, checkOut: string): Observable<Room[]> {
    const params = new HttpParams()
      .set('check_in', checkIn)
      .set('check_out', checkOut);

    return this.http.get<Room[]>(this.roomsEndpoint + '/available', {params});
  }
}
