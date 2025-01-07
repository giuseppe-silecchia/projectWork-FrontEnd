import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Booking} from '../../../../models/booking';
import {User} from '../../../../models/user';
import {DatePipe, NgForOf} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {BookingService} from '../../../../services/models/booking.service';

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
  @Output("reloadParentData") reloadParentData: EventEmitter<any> = new EventEmitter();

  constructor(private bookingService: BookingService, private loaderService: NgxSpinnerService, private toastrService: ToastrService) {
  }

  getPersonNameFromBooking(booking: Booking): String {
    const user = this.users.find(u => u.id === booking.user_id);
    return user ? `${user.first_name} ${user.last_name}` : 'Utente non trovato';
  }

  deleteBooking(booking: Booking) {
    this.loaderService.show();

    this.bookingService.cancelBooking(booking).subscribe(
      {
        next: () => {
          this.loaderService.hide();
          this.toastrService.success('Stanza eliminata con successo!');
          this.reloadParentData.emit();
        },
        error: (error) => {
          this.loaderService.hide();
          if (error.status === 500) {
            this.toastrService.error('Errore.', `La stanza ha delle prenotazioni associate!`)
          } else
            this.toastrService.error('Errore.', 'Riprovare.')
        }
      }
    );
  }
}
