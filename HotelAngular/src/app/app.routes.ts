import { Routes } from '@angular/router';
import { GuestComponent } from './pages/guest/guest.component';
import { RoomComponent } from './pages/room/room.component';
import { ReservationComponent } from './pages/reservation/reservation.component';

export const routes: Routes = [
  { path: '', component: GuestComponent },
  { path: 'guest', component: GuestComponent },
  { path: 'room', component: RoomComponent },
  { path: 'reservation', component: ReservationComponent },
];
