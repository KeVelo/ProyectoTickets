import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArtistasService } from 'src/app/services/artistas.service';
import { Router } from '@angular/router';

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

  constructor(private artistasService: ArtistasService, private router: Router) {}

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
      data => {
        // Filtrar conciertos que tienen una imagen asociada distinta al valor por defecto
        this.conciertos = data.filter(concert => this.getImagenPorId(concert.id_concierto) !== null);
        this.showConcerts();
      },
      error => {
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
      this.currentConcertIndex = Math.max(0, this.conciertos.length - 4); // Asegurarse de no tener índices negativos
    }
    this.showConcerts();
  }

  scrollRight(): void {
    this.currentConcertIndex += 4;
    if (this.currentConcertIndex >= this.conciertos.length) {
      this.currentConcertIndex = 0; // Reiniciar al inicio si llega al final
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
      case 10:
        return 'assets/concierto-carrusel/cas.jpg';
      case 11:
        return 'assets/concierto-carrusel/aespa.jpg';
      case 12:
        return 'assets/concierto-carrusel/stray.jpg';
      case 13:
        return 'assets/concierto-carrusel/mcr.jpg';
      case 14:
        return 'assets/concierto-carrusel/1975.jpg';
      default:
        return null; // Retornar null si no hay una imagen asociada
    }
  }
  

  comprar(idConcierto: number): void {
    if (localStorage.getItem('jwtToken')) {
      this.router.navigate(['/seleccion', idConcierto]);
    } else {
      alert('Debes iniciar sesión para poder comprar boletos.');
      this.router.navigate(['/inicio-sesion']);
    }
  }
}
