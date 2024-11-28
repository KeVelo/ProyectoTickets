import { Component, OnInit } from '@angular/core';
import { ArtistasService } from 'src/app/services/artistas.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-artistas-list',
  templateUrl: './artistas-list.component.html',
  styleUrls: ['./artistas-list.component.css']
})
export class ArtistasListComponent implements OnInit {
  conciertos: any[] = [];
  
  // Variables para el modal
  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(
    private artistasService: ArtistasService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.artistasService.getConciertos().subscribe(
      data => {
        this.conciertos = data;
      },
      error => {
        console.error('Error al obtener los conciertos:', error);
      }
    );
  }

  comprar(idConcierto: number): void {
    if (this.authService.isLoggedIn()) {
      // Redirigir a la página de selección de boletos con el id del concierto
      this.router.navigate(['/seleccion', idConcierto]);
    } else {
      // Guardar la URL actual para redirigir después del inicio de sesión
      localStorage.setItem('redirectUrl', `/seleccion/${idConcierto}`);
      
      // Mostrar modal en lugar de alert
      this.showModal = true;
      this.modalTitle = 'Inicia Sesión';
      this.modalMessage = 'Debes iniciar sesión para poder comprar boletos.';
    }
  }

  closeModal(): void {
    this.showModal = false;
    // Redirigir al inicio de sesión al cerrar el modal
    this.router.navigate(['/inicio-sesion']);
  }

  getImagenPorId(idConcierto: number): string {
    switch (idConcierto) {
      case 1:
        return 'assets/carrusel/artic_monkeys.jpg';
      case 2:
        return 'assets/carrusel/metallica.jpg';
      case 3:
        return 'assets/carrusel/karolg.jpg';
      case 4:
        return 'assets/carrusel/luis.png';
      case 10:
        return 'assets/carrusel/cas.jpg';
      case 11:
        return 'assets/carrusel/aespa.jpg';
      case 12:
        return 'assets/carrusel/stray.jpg';
      case 13:
        return 'assets/carrusel/mcr.jpg';
      case 14:
        return 'assets/carrusel/1975.jpg';
      default:
        return 'assets/concierto2.jpg'; // Retornar una imagen predeterminada si no hay una asociada
    }
  }
}
