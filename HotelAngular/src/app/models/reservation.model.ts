import { Guest } from './guest.model';
import { Room } from './room.model';

export interface Reservation {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  cost: number;
  paymentMethod: string;
  guest: Guest;
  room: Room;
}
