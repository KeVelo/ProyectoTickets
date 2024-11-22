import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Respuesta del login:', response);

        if (response && response.user && response.user.id_rol === 2) {
          this.authService.setToken(response.access_token);
          alert('Inicio de sesión exitoso como administrador');
          this.router.navigate(['/dashboard']); // Redirige al dashboard si es administrador
        } else {
          alert('No tienes permisos para acceder a esta sección.');
          this.authService.logout();
          this.router.navigate(['/admin']);
        }
      },
      error => {
        console.error('Error en el inicio de sesión:', error);
        alert('Error de autenticación. Verifica tus credenciales.');
      }
    );
  }
}
