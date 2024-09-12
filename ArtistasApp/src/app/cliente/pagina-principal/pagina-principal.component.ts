import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit, OnDestroy {
  carouselImages = [
    { src: 'assets/concert1.jpg', alt: 'Concert Image 1' },
    { src: 'assets/concert2.jpg', alt: 'Concert Image 2' },
    { src: 'assets/concert3.jpg', alt: 'Concert Image 3' }
  ];

  concerts = [
    { imgSrc: 'assets/coldplay.png', title: 'Coldplay' },
    { imgSrc: 'assets/coldplay.png', title: 'Concert 2' },
    { imgSrc: 'assets/coldplay.png', title: 'Concert 3' },
    { imgSrc: 'assets/coldplay.png', title: 'Concert 4' },
    { imgSrc: 'assets/coldplay.png', title: 'Concert 5' },
    { imgSrc: 'assets/coldplay.png', title: 'Concert 6' },
    { imgSrc: 'assets/coldplay.png', title: 'Concert 7' },
    { imgSrc: 'assets/coldplay.png', title: 'Concert 8' }
  ];

  currentSlide = 0;
  autoSlideInterval: any;
  currentConcertIndex = 0;
  visibleConcerts: any[] = [];

  ngOnInit(): void {
    this.autoSlide();
    this.showConcerts();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval);
  }

  showSlide(index: number): void {
    this.currentSlide = index;
  }

  autoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
    }, 3000);
  }

  showConcerts(): void {
    this.visibleConcerts = this.concerts.slice(this.currentConcertIndex, this.currentConcertIndex + 4);
  }

  scrollLeft(): void {
    this.currentConcertIndex -= 4;
    if (this.currentConcertIndex < 0) {
      this.currentConcertIndex = this.concerts.length - 4; // Vuelve al final si llega al inicio
    }
    this.showConcerts();
  }

  scrollRight(): void {
    this.currentConcertIndex += 4;
    if (this.currentConcertIndex >= this.concerts.length) {
      this.currentConcertIndex = 0; // Vuelve al inicio si llega al final
    }
    this.showConcerts();
  }
}
