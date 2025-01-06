import {Component, Input} from '@angular/core';
import {Room} from '../../../../models/room';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-room-table',
  imports: [
    NgForOf
  ],
  templateUrl: './room-table.component.html',
  styleUrl: './room-table.component.css'
})
export class RoomTableComponent {
  @Input() rooms: Room[] = [];
}
