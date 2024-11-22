import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistasService } from 'src/app/services/artistas.service';

@Component({
  selector: 'app-seleccion-boletos',
  templateUrl: './seleccion-boletos.component.html',
  styleUrls: ['./seleccion-boletos.component.css']
})
export class SeleccionBoletosComponent implements OnInit {
  concierto: any; // Almacena la información del concierto seleccionado
  localidades: any[] = []; // Lista de localidades
  localidadSeleccionada: string = '';
  cantidadBoletos: number | null = null;

  constructor(
    private artistasService: ArtistasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
    }
  }
  ngOnInit(): void {
    const idConcierto = this.route.snapshot.paramMap.get('id');
    if (idConcierto) {
      this.artistasService.getConciertoById(Number(idConcierto)).subscribe(
        (data) => {
          this.concierto = data;
  
          // Llama al método para cargar las localidades después de obtener el concierto
          this.cargarLocalidades(Number(idConcierto));
  
          const navigation = this.router.getCurrentNavigation();
          const state = navigation?.extras.state as {
            localidadSeleccionada: string;
            cantidadBoletos: number;
          };
  
          if (state) {
            this.localidadSeleccionada = state.localidadSeleccionada;
            this.cantidadBoletos = state.cantidadBoletos;
          }
        },
        (error) => {
          console.error('Error al obtener los detalles del concierto:', error);
        }
      );
    }
  }
  
  cargarLocalidades(idConcierto: number): void {
    this.artistasService.getLocalidades().subscribe(
      (localidades) => {
        console.log('Localidades completas:', localidades); // Verificar las localidades recibidas
        const localidadesFiltradas = localidades.filter(
          (localidad: any) => localidad.id_concierto === idConcierto
        );
  
        // Transformar las localidades al formato esperado
        this.localidades = [
          { nombre: 'PLATINUM', precio: localidadesFiltradas[0]?.platinum_precio || 0 },
          { nombre: 'VIP', precio: localidadesFiltradas[0]?.vip_precio || 0 },
          { nombre: 'GENERAL', precio: localidadesFiltradas[0]?.general_precio || 0 },
        ];
  
        console.log('Localidades filtradas y transformadas:', this.localidades);
      },
      (error) => {
        console.error('Error al obtener las localidades:', error);
      }
    );
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

  getEscenarioPorId(idLugar: number): string | null {
    switch (idLugar) {
      case 1:
        return 'assets/escenario/gimnasio.png';
      case 2:
        return 'assets/escenario/cusca.png';
      case 3:
        return 'assets/escenario/audi.png';
      default:
        return 'assets/escenario/escenario.png'; // Imagen por defecto si no hay una imagen asociada
    }
}

comprar(): void {
  if (this.localidadSeleccionada && this.cantidadBoletos != null && this.cantidadBoletos > 0) {
    // Buscar el precio de la localidad seleccionada
    const localidadSeleccionada = this.localidades.find(
      (localidad) => localidad.nombre === this.localidadSeleccionada
    );

    if (localidadSeleccionada) {
      this.router.navigate(['/compra'], {
        state: {
          concierto: this.concierto,
          localidadSeleccionada: localidadSeleccionada.nombre,
          precioLocalidad: localidadSeleccionada.precio,
          cantidadBoletos: this.cantidadBoletos,
        },
      });
    } else {
      alert('Por favor, selecciona una localidad válida.');
    }
  } else {
    console.warn('Por favor, selecciona una localidad y una cantidad de boletos antes de continuar.');
    alert('Por favor, selecciona una localidad y una cantidad de boletos antes de continuar.');
  }
}

}
