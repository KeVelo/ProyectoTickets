import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Datos de registro admin enviados:', {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      id_rol: 2
    });

    this.authService.register(this.nombre, this.email, this.password, ).subscribe(
      response => {
        console.log('Registro de administrador exitoso:', response);
        alert('Administrador registrado con éxito');
        this.router.navigate(['/admin']); // Redirige al login de administrador
      },
      error => {
        console.error('Error de registro de administrador:', error.message);
        alert('Error al registrar el administrador. Verifica los datos e inténtalo de nuevo.');
      }
    );
  }
}
