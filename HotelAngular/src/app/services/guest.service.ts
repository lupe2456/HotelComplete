import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from '../models/guest.model';
import { apiEndpoint } from '../helpers/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor(private http: HttpClient) {}

  getGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${apiEndpoint}/guests`);
  }
  createGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(`${apiEndpoint}/guests`, guest);
  }
  updateGuest(guest: Guest): Observable<Guest> {
    return this.http.patch<Guest>(`${apiEndpoint}/guests/${guest.id}`, guest);
  }
  deleteGuest(id: number): Observable<void> {
    return this.http.delete<void>(`${apiEndpoint}/guests/${id}`);
  }
}
