import {Component} from '@angular/core';
import {RoomService} from '../../services/models/room.service';
import {Room} from '../../models/room';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {Booking} from '../../models/booking';
import {NgForOf, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {BookingService} from '../../services/models/booking.service';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-book',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  booking: Booking = <Booking>{people: 1};
  dateError: boolean = false;
  readonly: boolean = false;

  constructor(private roomService: RoomService, private toasterService: ToastrService, private bookingService: BookingService, private loaderService: NgxSpinnerService) {
  }

  protected availableRooms: Room[] = [];

  /*
  * Metodo per validare le date di check-in e check-out.
  * Imposta dateError a true se la data di check-in è successiva a quella di check-out.
  * */
  validateDates() {
    const checkInDate = new Date(this.booking.check_in);
    const checkOutDate = new Date(this.booking.check_out);

    this.dateError = checkInDate && checkOutDate ? checkInDate >= checkOutDate : false
  }

  /*
  * Metodo per inviare il form di verifica della disponibilità delle camere.
  * Se il form è valido, chiama getFilteredRooms per ottenere le camere disponibili.
  * */
  submitCheckRoomForm(checkRoomForm: NgForm) {
    if (checkRoomForm.invalid) return;
    this.getFilteredRooms(this.booking.check_in, this.booking.check_out, this.booking.people);
  }

  /*
  * Metodo per resettare il form e la lista delle camere disponibili.
  * */
  resetForm(checkRoomForm: NgForm) {
    this.availableRooms = [];
    this.readonly = false;
    checkRoomForm.resetForm();
    this.booking = <Booking>{people: 1};
  }

  /*
  * Ottiene le camere disponibili in base alle date di check-in, check-out e al numero di persone.
  * Filtra le camere in base al numero massimo di persone.
  * */
  getFilteredRooms(checkIn: string, checkOut: string, people: number): void {
    this.loaderService.show();
    this.roomService.getAvailableRooms(checkIn, checkOut).subscribe({
      next: (rooms: Room[]) => {
        this.readonly = true;
        this.loaderService.hide();
        this.availableRooms = rooms.filter((room) => room.max_people >= people);
      },
      error: () => {
        this.readonly = true;
        this.loaderService.hide();
        this.toasterService.error("Riprovare.", "Errore!");
      }
    })
  }

  /*
  * Metodo per effettuare la prenotazione della camera. Se la camera ha un ID valido,
  * crea la prenotazione tramite BookingService
  * */
  bookRoom(form: NgForm, room: Room) {
    if (room.id == null) return;

    this.booking.room_id = room.id;

    this.loaderService.show();
    this.bookingService.createBooking(this.booking).subscribe({
      next: () => {
        this.loaderService.hide();
        this.resetForm(form);
        this.toasterService.success("Prenotazione effettuata", "Fatto!", {timeOut: 2000});
      }, error: () => {
        this.loaderService.hide();
        this.toasterService.error(`Errore durante la prenotazione della camera ${room.id}.`, "Errore!");
      }
    })
  }
}
