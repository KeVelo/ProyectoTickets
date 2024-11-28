import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent {
  username: string = ''; // Cambiado de email a username
  password: string = '';
  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Datos de inicio de sesión enviados:', { username: this.username, password: this.password });

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);

        const token = localStorage.getItem('access_token');
        if (token) {
          console.log('Token almacenado:', token);
          this.modalTitle = 'Inicio de Sesión Exitoso';
          this.modalMessage = 'Bienvenido a ConcierTop.';
          this.showModal = true;

          // Redirigir al usuario después de 2 segundos
          setTimeout(() => {
            this.closeModal();
            this.router.navigate(['/home']);
          }, 2000);
        } else {
          console.error('Token no recibido.');
          this.modalTitle = 'Error';
          this.modalMessage = 'No se recibió un token válido.';
          this.showModal = true;
        }
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.modalTitle = 'Error de Inicio de Sesión';
        this.modalMessage = error.message || 'Error en el inicio de sesión. Verifique sus credenciales.';
        this.showModal = true;
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }

  ngOnInit(): void {
    // Verificar si ya está logueado
    if (this.authService.isLoggedIn()) {
      console.log('El usuario ya está logueado.');
      this.router.navigate(['/home']);
    }
  }
}
