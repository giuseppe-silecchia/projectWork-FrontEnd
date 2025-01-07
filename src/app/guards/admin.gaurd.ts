import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../services/models/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService, private toastrService: ToastrService) {
  }

  /*
  * L'AuthGuard viene utilizzato dall'applicazione per proteggere determinate pagine se l'utente non è un amministratore.
  * Implementa solo l' interfaccia CanActivate, perchè protegge solo rotte principali (senza figli).
  * */

  canActivate(): boolean {
    const isAdmin = this.checkIsAdminValue();

    if (!isAdmin) {
      // Se non admin, reindirizza alla route princiaple
      this.router.navigate(['/']).then();
      this.toastrService.info('Non sei autorizzato ad accedere alla risorsa', 'Errore!');
      return false;
    }
    return true; // Consenti l'accesso alla rotta
  }

  // Logica per verificare se l'utente è un Admin
  private checkIsAdminValue(): boolean {
    console.log(this.userService.userIsAdmin());
    return this.userService.userIsAdmin();
  }
}
