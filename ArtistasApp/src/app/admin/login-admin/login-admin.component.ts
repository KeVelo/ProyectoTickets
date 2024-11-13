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
        this.authService.setToken(response.access_token);
        const rolUsuario = response.user.id_rol;

        if (rolUsuario === 2) {
          alert('Inicio de sesión exitoso como administrador');
          this.router.navigate(['/dashboard']); // Redirige al dashboard si es administrador
        } else {
          alert('No tienes permisos para acceder a esta sección.');
          this.authService.logout(); // Elimina el token en caso de que el rol no sea correcto
          this.router.navigate(['/admin']);
        }
      },
      error => {
        alert('Error de autenticación. Verifica tus credenciales.');
      }
    );
  }
}