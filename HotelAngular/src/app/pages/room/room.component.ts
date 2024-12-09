import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../components/navigation/navigation.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NavigationComponent,
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent {
  roomForm: FormGroup;
  rooms: Room[] = [];
  showForm: boolean = false; // Controla la visibilidad del formulario
  selectedRoomId: number | null = null;

  constructor(private roomService: RoomService) {
    // Crea el FormGroup con FormControl y sus validadores
    this.roomForm = new FormGroup({
      roomId: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      bedCount: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      floorNumber: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm; // Alterna la visibilidad del formulario
    if (!this.showForm) {
      this.resetForm();
    }
  }

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {
      const { roomId, ...roomData } = this.roomForm.value; // Excluye roomId

      if (this.selectedRoomId) {
        this.roomService
          .updateRoom({ id: this.selectedRoomId, ...roomData })
          .subscribe({
            next: (updatedRoom: Room) => {
              const index = this.rooms.findIndex(
                (room) => room.id === updatedRoom.id
              );
              if (index !== -1) this.rooms[index] = updatedRoom;

              this.resetForm();
              console.log('Habitación actualizada');
            },
            error: (err) =>
              console.error('Error al actualizar la habitación:', err),
          });
      } else {
        this.roomService.createRoom(roomData).subscribe({
          next: (createdRoom: Room) => {
            this.rooms.push(createdRoom);
            this.resetForm();
            console.log('Habitación creada');
          },
          error: (err) => console.error('Error al crear la habitación:', err),
        });
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  // Método auxiliar para limpiar y ocultar el formulario
  private resetForm() {
    this.selectedRoomId = null;
    this.roomForm.reset();
    this.showForm = false;
  }

  editRoom(id: number) {
    const roomToEdit = this.rooms.find((room) => room.id === id);
    if (!roomToEdit) {
      console.error('Habitación no encontrada con el ID:', id);
      return;
    }

    this.selectedRoomId = id;

    this.roomForm.setValue({
      roomId: roomToEdit.id,
      name: roomToEdit.name,
      bedCount: roomToEdit.bedCount,
      size: roomToEdit.size,
      floorNumber: roomToEdit.floorNumber,
      type: roomToEdit.type,
    });
    this.toggleForm();
  }

  editCancel() {
    this.selectedRoomId = null;
    this.roomForm.reset();
    this.toggleForm();
  }

  deleteRoom(id: number | undefined) {
    if (!id) {
      console.error('El ID de la habitación es inválido o no está definido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
      this.roomService.deleteRoom(id).subscribe({
        next: () => {
          this.rooms = this.rooms.filter((room) => room.id !== id);
          console.log('Habitación eliminada exitosamente');
        },
        error: (err) => {
          console.error('Error al eliminar la habitación:', err);
        },
      });
    }
  }
}
