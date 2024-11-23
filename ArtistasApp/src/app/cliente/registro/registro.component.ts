import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Datos de registro enviados:', {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      id_rol: 1 // Especificando el rol del cliente
    });

    this.authService.register(this.nombre, this.email, this.password, 1).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        this.showModal = true;
        this.modalTitle = 'Registro Exitoso';
        this.modalMessage = 'Usuario registrado con éxito. Redirigiendo al inicio de sesión.';
        setTimeout(() => {
          this.closeModal();
          this.router.navigate(['/inicio-sesion']);
        }, 2000); // Cierra el modal después de 2 segundos y redirige
      },
      error => {
        console.error('Error de registro:', error.message);
        this.showModal = true;
        this.modalTitle = 'Error de Registro';
        this.modalMessage = 'Error al registrar el usuario. Por favor, verifica los datos e inténtalo de nuevo.';
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }
}
