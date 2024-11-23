import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  username: string = ''; 
  password: string = '';
  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Datos de inicio de sesión enviados:', { username: this.username, password: this.password });
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login exitoso:', response);
        this.authService.setToken(response.access_token);

        const redirectUrl = localStorage.getItem('redirectUrl');
        if (redirectUrl) {
          this.router.navigateByUrl(redirectUrl);
          localStorage.removeItem('redirectUrl');
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Error de autenticación:', error.message);
        this.showModal = true;
        this.modalTitle = 'Error de autenticación';
        this.modalMessage = 'Credenciales incorrectas o error en la autenticación. Por favor, inténtalo de nuevo.';
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }
}
