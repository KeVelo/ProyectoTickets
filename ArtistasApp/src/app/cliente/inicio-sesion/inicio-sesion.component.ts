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
    console.log('Intentando login con:', { username: this.username, password: this.password });

    this.authService.login(this.username, this.password).subscribe(
      () => {
        console.log('Login exitoso.');

        // Mostrar mensaje de éxito
        this.modalTitle = 'Inicio de Sesión Exitoso';
        this.modalMessage = 'Bienvenido. Redirigiendo...';
        this.showModal = true;

        // Redirigir al usuario después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/home']);
          this.closeModal();
        }, 2000);
      },
      error => {
        console.error('Error en el inicio de sesión:', error);

        // Mostrar mensaje de error en modal
        this.modalTitle = 'Error de Inicio de Sesión';
        this.modalMessage = error.message;
        this.showModal = true;
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }
}
