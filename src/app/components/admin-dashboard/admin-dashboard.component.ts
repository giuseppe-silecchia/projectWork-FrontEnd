import {Component, OnInit} from '@angular/core';
import {Booking} from '../../models/booking';
import {BookingService} from '../../services/models/booking.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../models/user';
import {DatePipe, NgForOf} from '@angular/common';
import {UserService} from '../../services/models/user.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  currentUser!: User;
  users: User[] = [];
  bookings: Booking[] = [];

  constructor(private userService: UserService, private bookingService: BookingService, private loaderService: NgxSpinnerService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getAllUsers();
    this.getAllBookings();
  }


  private getCurrentUser() {
    this.loaderService.show();
    this.userService.getSelfInformation().subscribe({
      next: user => {
        this.currentUser = user;
        this.loaderService.hide();
      },
      error: (error) => {
        this.toastrService.error("Riprovare.", "Errore nel recuperare i dati dell'utente corrente!");
        this.loaderService.hide();
      }
    })
  }

  getAllUsers() {
    this.loaderService.show();
    this.userService.getSystemUsers().subscribe(
      {
        next: (users: User []) => {
          this.users = users;
          this.loaderService.hide();
        }, error: error => {
          this.toastrService.error("Riprovare.", "Errore nel recuperare i dati degli Utenti!");
          this.loaderService.hide();
        }
      }
    );
  }

  getAllBookings() {
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

  getPersonNameFromBooking(booking: Booking): String {
    const user = this.users.find(u => u.id === booking.user_id);
    return user ? `${user.first_name} ${user.last_name}` : 'Utente non trovato';
  }

  changeUserRole(user: User, toAdmin: boolean) {
    this.loaderService.show();
    this.userService.makeUserAdmin(user, toAdmin).subscribe({
        next: () => {
          this.toastrService.success('Operazione effettuata con successo');
          this.loaderService.hide();
        },
        error: () => {
          this.toastrService.error("Riprovare.", "Errore nel cambiare il ruolo!");
          this.loaderService.hide();
        }
      }
    )
  }
}
