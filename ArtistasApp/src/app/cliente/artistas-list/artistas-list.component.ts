import { Component, OnInit } from '@angular/core';
import { ArtistasService } from 'src/app/services/artistas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artistas-list',
  templateUrl: './artistas-list.component.html',
  styleUrls: ['./artistas-list.component.css']
})
export class ArtistasListComponent implements OnInit {
  conciertos: any[] = [];

  constructor(private artistasService: ArtistasService, private router: Router) {}

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

  // Método en el componente donde el usuario intenta comprar boletos
comprar(idConcierto: number): void {
  if (localStorage.getItem('jwtToken')) {
    this.router.navigate(['/seleccion', idConcierto]);
  } else {
    // Guardar la URL actual para redirigir después de iniciar sesión
    localStorage.setItem('redirectUrl', `/seleccion/${idConcierto}`);
    alert('Debes iniciar sesión para poder comprar boletos.');
    this.router.navigate(['/inicio-sesion']);
  }
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
        return 'assets/concierto2.jpg'; // Retornar null si no hay una imagen asociada
    }
  }
}
