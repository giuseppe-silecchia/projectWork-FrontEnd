import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../../services/models/user.service';
import {User} from '../../models/user';
import {ToastrService} from 'ngx-toastr';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private loaderService: NgxSpinnerService, private userService: UserService, private toasterService: ToastrService) {
  }

  // Al caricamento del componente, recupera le informazioni dell'utente
  ngOnInit() {
    this.getSelfInformation();
  }

  // Metodo per ottenere le informazioni dell'utente
  getSelfInformation() {
    this.loaderService.show();
    this.userService.getSelfInformation().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        this.loaderService.hide();
      }, error: () => {
        this.loaderService.hide();
        this.toasterService.error(`Errore nel recuperare le informazioni dell'utente.`, "Errore!");
      }
    });
  }

  // Metodo per inviare il form di aggiornamento dell'utente
  submitUserForm(userForm: NgForm) {
    if (!userForm.valid || !this.currentUser) return;

    this.loaderService.show();
    this.userService.updateSelfInformation(this.currentUser).subscribe({
      next: () => {
        this.loaderService.hide();
        this.toasterService.success(`Informazioni Aggiornate`);
        this.getSelfInformation()
      },
      error: () => {
        this.loaderService.hide();
        this.toasterService.error('Errore');
      }
    })
  };
}
