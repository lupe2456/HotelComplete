import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { apiEndpoint } from '../helpers/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${apiEndpoint}/reservations`);
  }
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${apiEndpoint}/reservations`,
      reservation
    );
  }
  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.patch<Reservation>(
      `${apiEndpoint}/reservations/${reservation.id}`,
      reservation
    );
  }
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${apiEndpoint}/reservations/${id}`);
  }
}
