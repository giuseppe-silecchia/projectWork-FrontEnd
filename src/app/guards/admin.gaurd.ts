import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../services/models/user.service';
import {Observable, switchMap, take} from 'rxjs';
import {User} from '../models/user';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private toastrService: ToastrService) {
  }

  canActivate(): Observable<boolean> {
    return this.userService.getSelfInformation().pipe(
      take(1), // Prendi solo il primo valore
      switchMap((user: User) => {
        if (user.isAdmin) {
          return new Observable<boolean>((observer) => observer.next(true));
        } else {
          this.router.navigate(['/']); // Naviga versola home
          this.toastrService.info('Non sei autorizzato ad accedere alla risorsa','Errore!');
          return new Observable<boolean>((observer) => observer.next(false));
        }
      }))
  }
}
