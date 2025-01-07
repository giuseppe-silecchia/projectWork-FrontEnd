import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../services/models/booking.service';
import {Booking} from '../../models/booking';
import {ToastrService} from 'ngx-toastr';
import {DatePipe, NgForOf} from '@angular/common';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-reservation',
  imports: [NgForOf, DatePipe],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit {

  userReservations: Booking[] = [];

  constructor(private bookingService: BookingService, private toastrService: ToastrService, private loaderService: NgxSpinnerService) {
  }

  ngOnInit() {
    this.loadData();  // Carica i dati all'inizializzazione del componente
  }

  // Metodo per annullare una prenotazione
  cancelReservation(booking: Booking) {
    this.loaderService.show();
    this.bookingService.cancelBooking(booking).subscribe({
      next: () => {
        this.loadData();
        this.toastrService.success("Prenotazione cancellata!");
      }, error: () => {
        this.toastrService.error(`Errore durante l'eliminazione della prenotazione #${booking.id}`, "Errore!");
        this.loaderService.hide();
      }
    })
  }

  // Metodo per caricare i dati (prenotazioni dell'utente)
  private loadData() {
    this.loaderService.show();
    this.bookingService.getUserBookings().subscribe({
      next: (bookings: Booking[]) => {
        this.userReservations = bookings;
        this.loaderService.hide();
      },
      error: () => {
        this.toastrService.error("Riprovare.", "Errore nel recuperare i dati!");
        this.loaderService.hide();
      }
    })
  }

  // Metodo per verificare se una prenotazione può essere cancellata
  canCancel(booking: Booking): boolean {
    const currentDate = new Date();
    const checkInDate = new Date(booking.check_in);

    /* Ritorna true se la data corrente è prima della data di check-in,
     quindi la prenotazione può essere cancellata*/
    return currentDate < checkInDate;
  }

}
