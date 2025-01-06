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
  @Input() rooms: Room[] = [];
  @Output("reloadParentData") reloadParentData: EventEmitter<any> = new EventEmitter();

  roomToCreate: Room = <Room>{max_people: 1};
  selectedRoomToEdit: Room | null = null;
  roomToEdit?: Room | null = null;

  constructor(private roomService: RoomService, private loaderService: NgxSpinnerService, private toastrService: ToastrService) {
  }

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

  submitEditRoom(editRoomForm: NgForm): void {
    if (editRoomForm.invalid && !this.roomToEdit) return;

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

  onRoomSelected(room: Room) {
    if (room) {
      this.selectedRoomToEdit = room;
      this.roomToEdit = Object.create(this.selectedRoomToEdit);
    }
  }

  protected readonly Object = Object;
}
