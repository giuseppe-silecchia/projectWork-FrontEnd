import {Room} from './room';

export interface Booking {  // interfaccia rappresentate una prenotazione
  id?: number;
  check_in: string;
  check_out: string;
  room_id: number;
  user_id: number;
  people: number;
  room?: Room | null;   //  Dettagli opzionali della stanza associata
}
