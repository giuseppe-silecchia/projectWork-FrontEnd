import {Component, OnInit} from '@angular/core';
import {Booking} from '../../models/booking';
import {BookingService} from '../../services/models/booking.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../models/user';
import {UserService} from '../../services/models/user.service';
import {UserTableComponent} from './tables/user-table/user-table.component';
import {BookingTableComponent} from './tables/booking-table/booking-table.component';
import {RoomService} from '../../services/models/room.service';
import {Room} from '../../models/room';
import {RoomTableComponent} from './tables/room-table/room-table.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    UserTableComponent,
    BookingTableComponent,
    RoomTableComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  currentUser!: User;
  users: User[] = [];
  bookings: Booking[] = [];
  rooms: Room[] = [];

  /*
  * Questo componente si occupa di far visualizzare all'amministratore del sistema
  * tutti i dati necessari alla gestione di quest'ultimo.
  *
  * */

  constructor(private roomService: RoomService, private userService: UserService, private bookingService: BookingService, private loaderService: NgxSpinnerService, private toastrService: ToastrService) {
  }

  // Carica i dati quando il componente è inizializzato
  ngOnInit() {
    this.loadData();
  }

  protected loadData(): void {
    this.getCurrentUser();  // Recupera i dati dell'utente corrente
    this.getAllUsers();     // Recupera tutti gli utenti
    this.getAllBookings();  // Recupera tutte le prenotazioni
    this.getAllRooms();     // Recupera tutte le stanze
  }

  private getCurrentUser() {
    this.loaderService.show();
    this.userService.getSelfInformation().subscribe({
      next: user => {
        this.currentUser = user;
        this.loaderService.hide();
      },
      error: () => {
        this.toastrService.error("Riprovare.", "Errore nel recuperare i dati dell'utente corrente!");
        this.loaderService.hide();
      }
    })
  }

  private getAllUsers() {
    this.loaderService.show();
    this.userService.getSystemUsers().subscribe(
      {
        next: (users: User []) => {
          this.users = users;
          this.loaderService.hide();
        }, error: () => {
          this.toastrService.error("Riprovare.", "Errore nel recuperare i dati degli Utenti!");
          this.loaderService.hide();
        }
      }
    );
  }

  private getAllBookings() {
    this.loaderService.show();
    this.bookingService.getAllBookings().subscribe({
      next: (bookings: Booking[]) => {
        this.bookings = bookings;
        this.loaderService.hide();
      },
      error: () => {
        this.toastrService.error("Riprovare.", "Errore nel recuperare i dati delle prenotazioni!");
        this.loaderService.hide();
      }
    })
  }

  private getAllRooms() {
    this.loaderService.show();
    this.roomService.getRooms().subscribe({
      next: (rooms: Room[]) => {
        this.rooms = rooms;
        this.loaderService.hide();
      },
      error: () => {
        this.toastrService.error("Riprovare.", "Errore nel recuperare i dati delle Stanze!");
        this.loaderService.hide();
      }
    })
  }

}
