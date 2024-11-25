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
  apellido: string = '';
  email: string = '';
  password: string = '';
  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Datos de registro enviados:', {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password
    });

    this.authService.register(this.nombre, this.apellido, this.email, this.password).subscribe(
      () => {
        this.modalTitle = 'Registro Exitoso';
        this.modalMessage = 'Usuario registrado correctamente. Redirigiendo al inicio de sesión...';
        this.showModal = true;

        setTimeout(() => {
          this.router.navigate(['/inicio-sesion']);
          this.closeModal();
        }, 2000);
      },
      error => {
        this.modalTitle = 'Error de Registro';
        this.modalMessage = error.message;
        this.showModal = true;
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }
}
