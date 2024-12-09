import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { Guest } from '../../models/guest.model';
import { Room } from '../../models/room.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavigationComponent,
    RouterModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  reservations: Reservation[] = [];
  selectedReservationId: number | null = null;
  showForm: boolean = false; // Controla la visibilidad del formulario

  constructor(private reservationService: ReservationService) {
    this.reservationForm = new FormGroup({
      checkInDate: new FormControl('', [Validators.required]),
      checkOutDate: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required, Validators.min(0)]),
      paymentMethod: new FormControl('', [Validators.required]),
      guestId: new FormControl('', [Validators.required]),
      roomId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.reservationService
      .getReservations()
      .subscribe((reservations: Reservation[]) => {
        this.reservations = reservations;
      });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      const reservationData: Reservation = {
        id: this.selectedReservationId || 0,
        checkInDate: this.reservationForm.value.checkInDate,
        checkOutDate: this.reservationForm.value.checkOutDate,
        cost: this.reservationForm.value.cost,
        paymentMethod: this.reservationForm.value.paymentMethod,
        guest: { id: this.reservationForm.value.guestId } as Guest,
        room: { id: this.reservationForm.value.roomId } as Room,
      };

      if (this.selectedReservationId) {
        this.reservationService.updateReservation(reservationData).subscribe(
          (updatedReservation: Reservation) => {
            const index = this.reservations.findIndex(
              (reservation) => reservation.id === updatedReservation.id
            );
            this.reservations[index] = updatedReservation;
            this.resetForm(); // Resetea el formulario después de la actualización
          },
          (error) => {
            console.error('Error al editar la reservación:', error);
          }
        );
      } else {
        this.reservationService.createReservation(reservationData).subscribe(
          (newReservation: Reservation) => {
            this.reservations.push(newReservation);
            this.resetForm(); // Resetea el formulario después de crear la reservación
          },
          (error) => {
            console.error('Error al crear la reservación:', error);
          }
        );
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  editReservation(id: number) {
    this.selectedReservationId = id;
    const reservationToEdit = this.reservations.find(
      (reservation) => reservation.id === id
    );
    if (reservationToEdit) {
      this.reservationForm.setValue({
        checkInDate: reservationToEdit.checkInDate,
        checkOutDate: reservationToEdit.checkOutDate,
        cost: reservationToEdit.cost,
        paymentMethod: reservationToEdit.paymentMethod,
        guestId: reservationToEdit.guest.id,
        roomId: reservationToEdit.room.id,
      });
      this.toggleForm(); // Muestra el formulario en modo edición
    }
  }

  toggleForm() {
    this.showForm = !this.showForm; // Alterna la visibilidad del formulario
    if (!this.showForm) {
      this.resetForm(); // Si se oculta el formulario, reseteamos el formulario
    }
  }

  editCancel() {
    this.resetForm(); // Resetea el formulario y oculta el formulario
  }

  private resetForm() {
    this.selectedReservationId = null; // Limpia el estado de edición
    this.reservationForm.reset();
    this.showForm = false; // Oculta el formulario
  }

  deleteReservation(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta reservación?')) {
      this.reservationService.deleteReservation(id).subscribe(() => {
        this.reservations = this.reservations.filter(
          (reservation) => reservation.id !== id
        );
      });
    }
  }
}
