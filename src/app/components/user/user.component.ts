import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../../services/models/user.service';
import {User} from '../../models/user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  currentUser?: User;

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
        this.loaderService.hide();
      }, error: () => {
        this.loaderService.hide();
        this.toasterService.error(`Errore nel recuperare le informazioni dell'utente.`, "Errore!");
      }
    });
  }
}
