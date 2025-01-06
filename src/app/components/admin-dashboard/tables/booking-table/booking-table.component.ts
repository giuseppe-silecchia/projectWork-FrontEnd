import {Component, Input} from '@angular/core';
import {Booking} from '../../../../models/booking';
import {User} from '../../../../models/user';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-booking-table',
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './booking-table.component.html',
  styleUrl: './booking-table.component.css'
})
export class BookingTableComponent {
  @Input() bookings: Booking[] = [];
  @Input() users: User[] = [];

  getPersonNameFromBooking(booking: Booking): String {
    const user = this.users.find(u => u.id === booking.user_id);
    return user ? `${user.first_name} ${user.last_name}` : 'Utente non trovato';
  }
}
