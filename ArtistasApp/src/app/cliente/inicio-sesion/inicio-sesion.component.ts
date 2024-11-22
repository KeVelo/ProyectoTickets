import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  username: string = ''; // Cambiado de 'email' a 'username'
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Datos de inicio de sesión enviados:', { username: this.username, password: this.password });
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login exitoso:', response);
        alert('Inicio de sesión exitoso');
        this.authService.setToken(response.access_token);

        // Verificar si hay una URL de redirección almacenada
        const redirectUrl = localStorage.getItem('redirectUrl');
        if (redirectUrl) {
          this.router.navigateByUrl(redirectUrl);
          localStorage.removeItem('redirectUrl'); // Limpiar la URL de redirección después de usarla
        } else {
          this.router.navigate(['/home']); // Redirige a la página principal si no hay URL almacenada
        }
      },
      error => {
        console.error('Error de autenticación:', error.message);
        alert('Credenciales incorrectas o error en la autenticación. Por favor, inténtalo de nuevo.');
      }
    );
  }
}
