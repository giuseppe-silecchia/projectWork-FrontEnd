import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/models/booking.service';
import {Booking} from '../../models/booking';
import {ToastrService} from 'ngx-toastr';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-reservation',
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit {

  userReservations: Booking[] = [];

  constructor(private bookingService: BookingService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.loadData();
  }

  cancelReservation(booking: Booking) {
    this.bookingService.cancelBooking(booking).subscribe({
      next: () => {
        this.loadData();
        this.toastrService.success("Prenotazione cancellata!");
      }, error: () => {
        this.toastrService.error(`Errore durante l'eliminazione della prenotazione #${booking.id}`, "Errore!");
      }
    })
  }

  private loadData() {
    this.bookingService.getUserBookings().subscribe({
      next: (bookings: Booking[]) => {
        this.userReservations = bookings;
      },
      error: () => {
        this.toastrService.error("Riprovare.", "Errore nel recuperare i dati!");
      }
    })
  }

  canCancel(booking: Booking): boolean {
    const currentDate = new Date();
    const checkInDate = new Date(booking.check_in);

    return currentDate < checkInDate;
  }

}
