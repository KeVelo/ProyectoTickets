import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        // Después del login, obtiene la información del usuario
        this.authService.getUserInfo().subscribe(
          (userInfo) => {
            console.log('Información del usuario:', userInfo);

            // Verifica si el usuario es admin
            if (this.authService.isAdmin()) {
              alert('Inicio de sesión exitoso como administrador.');
              this.router.navigate(['/conciertoscrud']); // Redirige al dashboard
            } else {
              alert('No tienes permisos para esta sección.');
              this.authService.logout();
            }
          },
          (error) => {
            alert('Error al obtener la información del usuario.');
          }
        );
      },
      (error) => {
        alert('Error en el inicio de sesión: ' + error.message);
      }
    );
  }
}
