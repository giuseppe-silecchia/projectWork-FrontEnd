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
  @Input() bookings: Booking[] = []; // Array di prenotazioni che viene passato al componente dal componente padre.
  @Input() users: User[] = [];  // Array di utenti che viene passato al componente dal componente padre.

  /* Emette un evento al componente genitore per aggiornare i dati.
   * Utilizzato per notificare al componente genitore di ricaricare i dati
   */
  @Output("reloadParentData") reloadParentData: EventEmitter<any> = new EventEmitter();

  /*
  * Il componente BookingTableComponent riceve un array di prenotazioni e utenti tramite la proprietà @Input().
  * Visualizza una tabella con tutti le prenotazioni e i relativi prenotanti.
  * La tabella permette all'utente amministratore di eliminare una qualsiasi prenotazione
  * */

  constructor(private bookingService: BookingService, private loaderService: NgxSpinnerService, private toastrService: ToastrService) {
  }

  /*
  * Una funzione che restituisce il nome completo dell'utente associato a una prenotazione.
  * Cerca l'utente tramite user_id e restituisce il nome completo (prima e cognome).
  * Se l'utente non viene trovato, restituisce "Utente non trovato".
  * */
  getPersonNameFromBooking(booking: Booking): String {
    const user = this.users.find(u => u.id === booking.user_id);
    return user ? `${user.first_name} ${user.last_name}` : 'Utente non trovato';
  }

  /* Metodo che gestisce la cancellazione di una prenotazione
  * Se ha successo vengono aggiornati i dati nel componente padre
  * */
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
