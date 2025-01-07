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
  @Input() users: User[] = [];  // Array di utenti che viene passato al componente dal componente padre.
  @Input() currentUser!: User;  // Utente attuale

  /*
  * Il componente UserTableComponent riceve un array di utenti e un utente corrente tramite le proprietà @Input().
  * Visualizza una tabella con tutti gli utenti
  * permettendo di all'utente amministratore di cambiare il ruolo di qualsiasi utente (tranne se stesso)
  * */

  constructor(private userService: UserService, private loaderService: NgxSpinnerService, private toastrService: ToastrService) {
  }

  /*
  * Permette di cambiare il ruolo di un utente (ad esempio, da normale ad amministratore).
  * Durante l'operazione, viene mostrato un indicatore di caricamento,
  * e viene fornito un feedback all'utente in caso di successo o errore.
  * */
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
