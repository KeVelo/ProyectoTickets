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
        alert('Usuario registrado con éxito');
        this.router.navigate(['/inicio-sesion']); // Redirige al login después de registrarse
      },
      error => {
        console.error('Error de registro:', error.message);
        alert('Error al registrar el usuario. Por favor, verifica los datos e inténtalo de nuevo.');
      }
    );
  }
}
