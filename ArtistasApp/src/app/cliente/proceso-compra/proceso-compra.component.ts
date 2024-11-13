import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proceso-compra',
  templateUrl: './proceso-compra.component.html',
  styleUrls: ['./proceso-compra.component.css']
})
export class ProcesoCompraComponent implements OnInit {
  concierto: any;
  localidadSeleccionada: string = '';
  cantidadBoletos: number = 1;
  precioBase: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      concierto: any;
      localidadSeleccionada: string;
      cantidadBoletos: number;
    };

    if (state) {
      this.concierto = state.concierto;
      this.localidadSeleccionada = state.localidadSeleccionada;
      this.cantidadBoletos = state.cantidadBoletos;
      this.precioBase = state.concierto.precio_base;
    }
  }

  ngOnInit(): void {}

  editarCompra(): void {
    if (this.concierto && this.concierto.id_concierto) {
      this.router.navigate(['/seleccion', this.concierto.id_concierto], {
        state: {
          concierto: this.concierto,
          localidadSeleccionada: this.localidadSeleccionada,
          cantidadBoletos: this.cantidadBoletos
        }
      });
    } else {
      console.error('No se pudo redirigir a la selección de boletos: ID de concierto no encontrado.');
    }
  }

  cancelarCompra(): void {
    // Aquí puedes agregar cualquier lógica para limpiar el estado de la compra si es necesario
    console.log('Compra cancelada. Redirigiendo a la página principal.');
    
    // Redirige a la página principal
    this.router.navigate(['/']);
  }
  
  

  getImagenTopPorId(idConcierto: number): string | null {
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
        return null; // Retornar null si no hay una imagen asociada
    }
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
}
