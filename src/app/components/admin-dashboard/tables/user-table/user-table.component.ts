import {Component, Input} from '@angular/core';
import {User} from '../../../../models/user';
import {NgForOf} from '@angular/common';
import {UserService} from '../../../../services/models/user.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-table',
  imports: [
    NgForOf
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Input() currentUser!: User;

  constructor(private userService: UserService, private loaderService: NgxSpinnerService, private toastrService: ToastrService) {
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
