import {Room} from './room';

export interface Booking {
  id?: number;
  check_in: string;
  check_out: string;
  room_id: number;
  people: number;
  room?: Room | null;
}
