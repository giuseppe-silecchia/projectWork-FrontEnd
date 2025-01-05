import {Component} from '@angular/core';
import {RoomService} from '../../services/models/room.service';
import {Room} from '../../models/room';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {Booking} from '../../models/booking';
import {NgForOf, NgIf} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {BookingService} from '../../services/models/booking.service';


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

  constructor(private roomService: RoomService, private toasterService: ToastrService, private bookingService: BookingService) {
  }

  protected availableRooms: Room[] = [];

  validateDates() {
    const checkInDate = new Date(this.booking.check_in);
    const checkOutDate = new Date(this.booking.check_out);

    console.log(this.dateError)

    this.dateError = checkInDate && checkOutDate ? checkInDate >= checkOutDate : false

  }

  submitCheckRoomForm(checkRoomForm: NgForm) {
    if (checkRoomForm.invalid) return;
    this.readonly = true;
    this.getFilteredRooms(this.booking.check_in, this.booking.check_out, this.booking.people);
  }

  resetForm(checkRoomForm: NgForm) {
    this.availableRooms = [];
    this.booking = <Booking>{people: 1};
    this.readonly = false;
    checkRoomForm.resetForm();
  }

  getFilteredRooms(checkIn: string, checkOut: string, people: number): void {
    this.roomService.getAvailableRooms(checkIn, checkOut).subscribe({
      next: (rooms: Room[]) => {
        this.availableRooms = rooms.filter((room) => room.max_people >= people);
      },
      error: (err) => {
        this.toasterService.error("Riprovare.", "Errore!");
      }
    })

  }

  bookRoom(form: NgForm, room: Room) {
    if (room.id == null) return;

    this.booking.room_id = room.id;
    this.bookingService.createBooking(this.booking).subscribe({
      next: () => {
        this.resetForm(form);
        this.toasterService.success("Prenotazione effettuata", "Fatto!", {timeOut: 2000});
      }, error: (err) => {
        this.toasterService.error(`Errore durante la prenotazione della camera ${room.id}.`, "Errore!");
      }
    })
  }
}
