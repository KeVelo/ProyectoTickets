import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistasService } from 'src/app/services/artistas.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seleccion-boletos',
  templateUrl: './seleccion-boletos.component.html',
  styleUrls: ['./seleccion-boletos.component.css'],
})
export class SeleccionBoletosComponent implements OnInit {
  concierto: any; // Almacena la información del concierto seleccionado
  localidades: any[] = []; // Lista de localidades
  localidadSeleccionada: string = '';
  cantidadBoletos: number | null = null;

  // Variables para el modal
  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(
    private artistasService: ArtistasService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      localidadSeleccionada: string;
      cantidadBoletos: number;
    };
  
    // Cargamos el estado previo si existe
    if (state) {
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
          this.cargarLocalidades(Number(idConcierto));
        },
        (error) => {
          this.showModalMessage('Error', 'No se pudo cargar la información del concierto.');
          console.error('Error al obtener los detalles del concierto:', error);
        }
      );
    }
  }
  
  

  cargarLocalidades(idConcierto: number): void {
    this.artistasService.getLocalidades().subscribe(
      (localidades) => {
        const localidadesFiltradas = localidades.filter(
          (localidad: any) => localidad.id_concierto === idConcierto
        );
        this.localidades = [
          { nombre: 'PLATINUM', precio: localidadesFiltradas[0]?.platinum_precio || 0 },
          { nombre: 'VIP', precio: localidadesFiltradas[0]?.vip_precio || 0 },
          { nombre: 'GENERAL', precio: localidadesFiltradas[0]?.general_precio || 0 },
        ];
      },
      (error) => {
        this.showModalMessage('Error', 'No se pudieron cargar las localidades.');
        console.error('Error al cargar las localidades:', error);
      }
    );
  }

  comprar(): void {
    if (this.authService.isLoggedIn()) {
      if (this.localidadSeleccionada && this.cantidadBoletos != null && this.cantidadBoletos > 0) {
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
          this.showModalMessage('Error', 'Selecciona una localidad válida.');
        }
      } else {
        this.showModalMessage('Advertencia', 'Selecciona una localidad y una cantidad de boletos antes de continuar.');
      }
    } else {
      // Si no está logueado, guardar la URL de redirección
      localStorage.setItem('redirectUrl', `/seleccion/${this.concierto.id_concierto}`);
      this.showModalMessage('Inicia Sesión', 'Debes iniciar sesión para continuar con la compra.');
    }
  }

  // Método para mostrar el modal con un mensaje
  showModalMessage(title: string, message: string): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    if (this.modalTitle === 'Inicia Sesión') {
      this.router.navigate(['/inicio-sesion']);
    }
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
      case 5:
        return 'assets/carrusel/cas.jpg';
      case 6:
        return 'assets/carrusel/aespa.jpg';
      case 7:
        return 'assets/carrusel/stray.jpg';
      case 8:
        return 'assets/carrusel/mcr.jpg';
      case 9:
        return 'assets/carrusel/1975.jpg';
      default:
        return null;
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

  getEscenarioPorId(idLugar: number): string | null {
    switch (idLugar) {
      case 1:
        return 'assets/escenario/gimnasio.png';
      case 2:
        return 'assets/escenario/cusca.png';
      case 3:
        return 'assets/escenario/audi.png';
      default:
        return 'assets/escenario/escenario.png';
    }
  }
}
