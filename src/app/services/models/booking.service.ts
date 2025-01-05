import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {HttpClient} from '@angular/common/http';
import {catchError, forkJoin, map, Observable, of, switchMap} from 'rxjs';
import {Booking} from '../../models/booking';
import {RoomService} from './room.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsEndpoint = environment.apiUrl + '/bookings';

  constructor(private http: HttpClient, private roomService: RoomService) {
  }

  createBooking(booking: Booking): Observable<Object> {
    return this.http.post(this.bookingsEndpoint, booking);
  }

  getUserBookings(): Observable<Booking[]> {
    /*
    * Recupero le prentoazioni dell'utente e uso lo switchmap per passare il flusso delle prenotazioni al flusso per
    * recuperare anche i dettagli della stanza associata
    * per ogni prenotazione vado a recuperare i dettagli della stanza e in caso di errore la properietà 'room' sarà null.
    * Infine con la forkJoin attendo che tutti gli observables siano completati e restituisco un array di Prenotazioni
    * */

    return this.http.get<Booking[]>(this.bookingsEndpoint + '/user').pipe(switchMap(bookings => {
      if (bookings.length === 0) return of([]);

      const bookingsWithRooms = bookings.map(booking =>
        this.roomService.getRoom(booking.room_id).pipe(
          map(room => ({...booking, room})),
          catchError(() => {
            // Se c'è un errore, restituisci il booking con room = null
            return [{...booking, room: null}];
          })
        )
      );
      return forkJoin(bookingsWithRooms);
    }));
  }

  cancelBooking(booking: Booking): Observable<Object> {
    return this.http.delete(`${this.bookingsEndpoint}/${booking.id}`);
  }
}
