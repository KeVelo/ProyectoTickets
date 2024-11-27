import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ArtistasService } from '../../services/artistas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;
  isLoggedIn: boolean = false;
  searchQuery: string = ''; // Almacena el término de búsqueda
  sugerencias: any[] = []; // Lista de sugerencias

  constructor(
    private authService: AuthService,
    private artistasService: ArtistasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getLoggedInStatus().subscribe((status) => {
      this.isLoggedIn = status;
      this.actualizarUsuario();
    });

    this.actualizarUsuario();
  }

  actualizarUsuario(): void {
    this.userName = this.authService.getUserName();
  }

  logout(): void {
    this.authService.logout();
    this.actualizarUsuario(); // Actualiza el estado del header
    this.router.navigate(['/inicio-sesion']);
  }

  buscarConcierto(): void {
    if (this.searchQuery.trim()) {
      this.artistasService.buscarConcierto(this.searchQuery).subscribe(
        (resultado) => {
          if (resultado && resultado.id_concierto) {
            this.router.navigate(['/seleccion', resultado.id_concierto]);
          } else {
            alert('No se encontraron conciertos que coincidan con la búsqueda.');
          }
        },
        (error) => {
          console.error('Error en la búsqueda:', error);
          alert('Hubo un problema al buscar el concierto.');
        }
      );
    }
  }

  buscarConciertosSugeridos(): void {
    if (this.searchQuery.trim().length > 0) {
      this.artistasService.getConciertos().subscribe(
        (conciertos) => {
          this.sugerencias = conciertos.filter((concierto) =>
            concierto.nombre_concierto.toLowerCase().includes(this.searchQuery.toLowerCase())
          ).slice(0, 5); // Limitar el número de sugerencias
        },
        (error) => {
          console.error('Error al buscar sugerencias:', error);
        }
      );
    } else {
      this.sugerencias = []; // Limpiar sugerencias si el campo de búsqueda está vacío
    }
  }

  seleccionarConcierto(concierto: any): void {
    this.searchQuery = concierto.nombre_concierto;
    this.sugerencias = []; // Limpiar las sugerencias al seleccionar
    this.router.navigate(['/seleccion', concierto.id_concierto]);
  }
}
