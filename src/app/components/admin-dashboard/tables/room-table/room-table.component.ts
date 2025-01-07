import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Room} from '../../../../models/room';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {RoomService} from '../../../../services/models/room.service';

@Component({
  selector: 'app-room-table',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './room-table.component.html',
  styleUrl: './room-table.component.css'
})
export class RoomTableComponent {
  @Input() rooms: Room[] = []; // Array di stanze che viene passato al componente dal componente padre.

  /* Emette un evento al componente genitore per aggiornare i dati.
  * Utilizzato per notificare al componente genitore di ricaricare i dati
  */
  @Output("reloadParentData") reloadParentData: EventEmitter<any> = new EventEmitter();

  roomToCreate: Room = <Room>{max_people: 1};
  selectedRoomToEdit: Room | null = null;
  roomToEdit?: Room | null = null;

  /*
  * Il componente RoomTableComponent riceve un array di stanze tramite proprietà @Input().
  * Visualizza una tabella con tutti le stanze presenti nel sistema.
  * La tabella permette all'utente amministratore di eliminare, aggiungere e modificare una qualsiasi stanza
* */


  constructor(private roomService: RoomService, private loaderService: NgxSpinnerService, private toastrService: ToastrService) {
  }

  /*
  * Questo metodo gestisce la creazione di una nuova stanza.
  * Se il modulo è valido, invia i dati al server (tramite il roomService) per aggiungere la stanza.
  * Se la stanza è stata creata correttamente, viene notificato un successo
  * il modulo viene resettato e vengono aggiornati i dati.
  * In caso di errore, viene visualizzato un messaggio di errore appropriato.
  * */
  submitCreateRoom(createRoomForm: NgForm): void {
    if (createRoomForm.invalid) return;

    this.roomService.addRoom(this.roomToCreate).subscribe({
      next: () => {
        createRoomForm.resetForm();
        this.loaderService.hide();
        this.toastrService.success('Stanza aggiunta con successo!');
        this.reloadParentData.emit();
      },
      error: (error) => {
        this.loaderService.hide();
        if (error.status === 500) {
          this.toastrService.error('Errore.', `Stanza ${this.roomToCreate.room_number} già esistente`)
        } else
          this.toastrService.error('Errore.', 'Riprovare.')
      }
    });
  }

  // Questo metodo gestisce l'aggiornamento di una stanza esistente.
  submitEditRoom(editRoomForm: NgForm): void {
    if (editRoomForm.invalid && !this.roomToEdit) return;

    this.loaderService.show();
    this.roomService.editRoom(this.roomToEdit!).subscribe({
        next: () => {
          editRoomForm.resetForm();
          this.loaderService.hide();
          this.toastrService.success('Stanza aggiornata con successo!');
          this.reloadParentData.emit();
        },
        error: (error) => {
          this.loaderService.hide();
          if (error.status === 500) {
            this.toastrService.error('Errore.', `Stanza ${this.roomToEdit!.room_number} già esistente`)
          } else
            this.toastrService.error('Errore.', 'Riprovare.')
        }
      }
    );
  }

  // Il metodo viene invocato quando una stanza viene selezionata (dal form per modificare una stanza).
  onRoomSelected(room: Room) {
    if (room) {
      this.selectedRoomToEdit = room;
      this.roomToEdit = Object.create(this.selectedRoomToEdit);
    }
  }

  // Gestisce l'eliminazione di una stanza.
  deleteRoom(room: Room) {
    this.loaderService.show();

    this.roomService.deleteRoom(room).subscribe(
      {
        next: () => {
          this.loaderService.hide();
          this.toastrService.success('Stanza eliminata con successo!');
          this.reloadParentData.emit();
        },
        error: (error) => {
          this.loaderService.hide();
          if (error.status === 500) {
            this.toastrService.error('Errore.', `La stanza ha delle prenotazioni associate!`)
          } else
            this.toastrService.error('Errore.', 'Riprovare.')
        }
      }
    );
  }
}
