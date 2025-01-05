import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Booking} from '../../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsEndpoint = environment.apiUrl + '/bookings';

  constructor(private http: HttpClient) {
  }

  createBooking(booking: Booking): Observable<Object> {
    return this.http.post(this.bookingsEndpoint, booking);
  }
}
