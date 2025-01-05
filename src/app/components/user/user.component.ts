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

  ngOnInit() {
    this.getSelfInformation();
  }


  getSelfInformation() {
    this.loaderService.show();
    this.userService.getSelfInformation().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        console.log(user);
        this.loaderService.hide();
      }, error: () => {
        this.loaderService.hide();
        this.toasterService.error(`Errore nel recuperare le informazioni dell'utente.`, "Errore!");
      }
    });
  }

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
