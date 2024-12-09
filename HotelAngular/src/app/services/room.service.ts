import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../helpers/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${apiEndpoint}/rooms`);
  }
  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${apiEndpoint}/rooms`, room);
  }
  updateRoom(room: Room): Observable<Room> {
    return this.http.patch<Room>(`${apiEndpoint}/rooms/${room.id}`, room);
  }
  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${apiEndpoint}/rooms/${id}`);
  }
}
