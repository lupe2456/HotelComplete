import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GuestService } from '../../services/guest.service';
import { Guest } from '../../models/guest.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../components/navigation/navigation.component';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NavigationComponent,
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
})
export class GuestComponent implements OnInit {
  guestForm: FormGroup;
  guests: Guest[] = [];
  showForm: boolean = false; // Controla la visibilidad del formulario
  selectedGuestId: number | null = null;

  constructor(private apiService: GuestService) {
    // Crea el FormGroup con FormControl y sus validadores
    this.guestForm = new FormGroup({
      guestId: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm; // Alterna la visibilidad del formulario
    if (!this.showForm) {
      this.resetForm(); // Si se oculta el formulario, reseteamos el formulario
    }
  }

  ngOnInit(): void {
    this.apiService.getGuests().subscribe((guests: Guest[]) => {
      this.guests = guests;
    });
  }

  onSubmit() {
    if (this.guestForm.valid) {
      const { guestId, ...guestData } = this.guestForm.value; // Excluye guestId

      if (this.selectedGuestId) {
        // Actualización de un huésped existente
        this.apiService
          .updateGuest({ id: this.selectedGuestId, ...guestData })
          .subscribe({
            next: (updatedGuest: Guest) => {
              const index = this.guests.findIndex(
                (guest) => guest.id === updatedGuest.id
              );
              if (index !== -1) this.guests[index] = updatedGuest;

              this.resetForm();
              console.log('Huésped actualizado exitosamente');
            },
            error: (err) =>
              console.error('Error al actualizar el huésped:', err),
          });
      } else {
        // Creación de un nuevo huésped
        this.apiService.createGuest(guestData).subscribe({
          next: (createdGuest: Guest) => {
            this.guests.push(createdGuest);
            this.resetForm();
            console.log('Huésped creado exitosamente');
          },
          error: (err) => console.error('Error al crear el huésped:', err),
        });
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  // Método auxiliar para limpiar y ocultar el formulario
  resetForm() {
    this.guestForm.reset();
    this.selectedGuestId = null;
    this.showForm = false;
  }

  editGuest(id: number) {
    const guestToEdit = this.guests.find((guest) => guest.id === id);
    if (!guestToEdit) {
      console.error('Huésped no encontrado con el ID:', id);
      return;
    }

    this.selectedGuestId = id;

    this.guestForm.setValue({
      guestId: guestToEdit.id,
      firstName: guestToEdit.firstName,
      lastName: guestToEdit.lastName,
      email: guestToEdit.email,
      phone: guestToEdit.phone,
      birthDate: guestToEdit.birthDate,
    });
    this.toggleForm();
  }

  editCancel() {
    this.selectedGuestId = null;
    this.guestForm.reset();
    this.toggleForm();
  }

  deleteGuest(id: number | undefined) {
    if (!id) {
      console.error('El ID del huésped es inválido o no está definido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar este huésped?')) {
      this.apiService.deleteGuest(id).subscribe({
        next: () => {
          this.guests = this.guests.filter((guest) => guest.id !== id);
          console.log('Huésped eliminado exitosamente');
        },
        error: (err) => {
          console.error('Error al eliminar el huésped:', err);
        },
      });
    }
  }
}
