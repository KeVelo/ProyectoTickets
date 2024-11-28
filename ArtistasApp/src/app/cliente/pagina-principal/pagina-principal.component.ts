import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArtistasService } from 'src/app/services/artistas.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit, OnDestroy {
  carouselImages = [
    { src: 'assets/carrusel/artic_monkeys.jpg', alt: 'Concert Image 1' },
    { src: 'assets/carrusel/1975.jpg', alt: 'Concert Image 2' },
    { src: 'assets/carrusel/cas.jpg', alt: 'Concert Image 3' }
  ];

  conciertos: any[] = [];
  currentSlide = 0;
  autoSlideInterval: any;
  currentConcertIndex = 0;
  visibleConcerts: any[] = [];

  // Variables para el modal
  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(
    private artistasService: ArtistasService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.autoSlide();
    this.obtenerConciertos();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval);
  }

  showSlide(index: number): void {
    this.currentSlide = index;
    clearInterval(this.autoSlideInterval); // Detener el auto-slide al hacer clic
    this.autoSlide(); // Reiniciar el auto-slide
  }

  autoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
    }, 3000);
  }

  obtenerConciertos(): void {
    this.artistasService.getConciertos().subscribe(
      (data) => {
        this.conciertos = data.filter((concert) => this.getImagenPorId(concert.id_concierto) !== null);
        this.showConcerts();
      },
      (error) => {
        console.error('Error al obtener los conciertos:', error);
      }
    );
  }

  showConcerts(): void {
    this.visibleConcerts = this.conciertos.slice(this.currentConcertIndex, this.currentConcertIndex + 4);
  }

  scrollLeft(): void {
    this.currentConcertIndex -= 4;
    if (this.currentConcertIndex < 0) {
      this.currentConcertIndex = Math.max(0, this.conciertos.length - 4);
    }
    this.showConcerts();
  }

  scrollRight(): void {
    this.currentConcertIndex += 4;
    if (this.currentConcertIndex >= this.conciertos.length) {
      this.currentConcertIndex = 0;
    }
    this.showConcerts();
  }

  getImagenPorId(idConcierto: number): string | null {
    switch (idConcierto) {
      case 1:
        return 'assets/concierto-carrusel/artic_monkeys.jpg';
      case 2:
        return 'assets/concierto-carrusel/metallica.jpg';
      case 3:
        return 'assets/concierto-carrusel/karolg.jpg';
      case 4:
        return 'assets/concierto-carrusel/luis.jpg';
      case 5:
        return 'assets/concierto-carrusel/cas.jpg';
      case 6:
        return 'assets/concierto-carrusel/aespa.jpg';
      case 7:
        return 'assets/concierto-carrusel/stray.jpg';
      case 8:
        return 'assets/concierto-carrusel/mcr.jpg';
      case 9:
        return 'assets/concierto-carrusel/1975.jpg';
      default:
        return null;
    }
  }

  comprar(idConcierto: number): void {
    if (this.authService.isLoggedIn()) {
      // Redirigir a la página de selección si el usuario está logueado
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
    this.router.navigate(['/inicio-sesion']); // Redirigir al inicio de sesión al cerrar el modal
  }
}
