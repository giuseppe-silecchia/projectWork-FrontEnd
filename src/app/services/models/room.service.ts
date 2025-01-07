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

  /*
  * Recupera tutte le stanze disponibili nel sistema.
  * */
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsEndpoint);
  }
  /*
  * Recupera i dettagli di una stanza specifica, identificata dal suo id.
  * */
  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.roomsEndpoint}/${id}`);
  }

  /*
  * Elimina una stanza specifica dal sistema, identificata dal suo id.
  * Effettua una richiesta di HTTP di tipo DELETE
  * */
  deleteRoom(room:Room): Observable<any> {
    return this.http.delete<any>(`${this.roomsEndpoint}/${room.id}`);
  }

  /*
  * Aggiunge una nuova stanza al sistema inviando l'oggetto Room al backend.
  * */
  addRoom(room: Room): Observable<any> {
    return this.http.post<any>(`${this.roomsEndpoint}`, room);
  }

  /*
  * Modifica parzialmente i dettagli di una stanza esistente, utilizzando il metodo PATCH
  * */
  editRoom(room:Room): Observable<any> {
    return this.http.patch<any>(`${this.roomsEndpoint}/${room.id}`, room);
  }

  /*
  * Recupera le stanze disponibili in un determinato periodo di tempo (check-in e check-out).
  * L
  * */
  getAvailableRooms(checkIn: string, checkOut: string): Observable<Room[]> {
    const params = new HttpParams() // creiamo dei parametri da aggiungere alla richiesta
      .set('check_in', checkIn)     // Aggiunge il parametro check_in
      .set('check_out', checkOut);  // Aggiunge il parametro check_out

    return this.http.get<Room[]>(this.roomsEndpoint + '/available', {params});
  }
}
