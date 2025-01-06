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

  constructor(private roomService: RoomService, private loaderService: NgxSpinnerService, private toastrService: ToastrService) {
  }

  submitCreateRoom(editRoomForm: NgForm): void {
    if (editRoomForm.invalid) return;

    this.roomService.addRoom(this.roomToCreate).subscribe({
      next: () => {
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
}
