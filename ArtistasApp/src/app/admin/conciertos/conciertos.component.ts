import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConciertosService } from 'src/app/services/conciertos.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-conciertos',
  templateUrl: './conciertos.component.html',
  styleUrls: ['./conciertos.component.css']
})
export class ConciertosComponent implements OnInit {
  conciertosForm: FormGroup;
  conciertos: any[] = [];
  lugares: any[] = [];
  conciertoEditando: any = null;
busquedaId: string = ''; // Variable para almacenar el valor del campo de búsqueda
conciertosOriginales: any[] = []; // Backup de la lista original de conciertos


  constructor(
    private fb: FormBuilder,
    private conciertosService: ConciertosService,
    private authService: AuthService
  ) {
    this.conciertosForm = this.fb.group({
      nombre_concierto: ['', Validators.required],
      fecha_concierto: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_apertura: ['', Validators.required],
      precio_base: [0, Validators.required],
      id_lugar: ['', Validators.required],
      /*ruta_carrusel: [''],*/
      /*ruta_concierto_carrusel: [''],*/
      estado: ['Programado', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadConciertos();
    this.loadLugares();

    this.cargarConciertos();
  }

  loadConciertos(): void {
    this.conciertosService.getConciertos().subscribe((data) => {
      this.conciertos = data;
    });
  }

  /*loadLugares(): void {
    // Cargar lugares desde un servicio o API.
    this.lugares = [
      { id: 1, nombre: 'Lugar A' },
      { id: 2, nombre: 'Lugar B' }
    ];
  }*/

    loadLugares(): void {
      this.conciertosService.getLugares().subscribe(
        (data) => {
          this.lugares = data.map((lugar: any) => ({
            id: lugar.id_lugar,
            nombre: lugar.nombre_lugar,
          }));
        },
        (error) => {
          console.error('Error al cargar los lugares:', error);
        }
      );
    }

    

  guardarConcierto(): void {
    const conciertoData = this.conciertosForm.value;
    if (this.conciertoEditando) {
      this.conciertosService.updateConcierto(this.conciertoEditando.id_concierto, conciertoData).subscribe(() => {
        this.resetFormulario();
        this.loadConciertos();
      });
    } else {
      this.conciertosService.createConcierto(conciertoData).subscribe(() => {
        this.resetFormulario();
        this.loadConciertos();
      });
    }
  }

  editarConcierto(concierto: any): void {
    this.conciertoEditando = concierto;
    this.conciertosForm.patchValue(concierto);
  }

  eliminarConcierto(concierto: any): void {
    if (confirm('¿Seguro que deseas eliminar este concierto?')) {
      this.conciertosService.deleteConcierto(concierto.id_concierto).subscribe(() => {
        this.loadConciertos();
      });
    }
  }

  resetFormulario(): void {
    this.conciertosForm.reset();
    this.conciertoEditando = null;
    this.conciertosForm.patchValue({ estado: 'Programado' });
  }

  getLugarNombre(id: number): string {
    return this.lugares.find((lugar) => lugar.id === id)?.nombre || 'Desconocido';
  }


  buscarConciertoPorId(): void {
    if (this.busquedaId.trim() === '') {
      alert('Por favor, ingresa un ID de concierto para buscar.');
      return;
    }
  
    const id = parseInt(this.busquedaId, 10);
    if (isNaN(id)) {
      alert('Por favor, ingresa un ID válido.');
      return;
    }
  
    this.conciertosService.getConciertos().subscribe({
      next: (conciertos) => {
        const conciertoEncontrado = conciertos.find((concierto: any) => concierto.id_concierto === id);
        if (conciertoEncontrado) {
          this.conciertos = [conciertoEncontrado]; // Muestra solo el concierto encontrado
        } else {
          alert('No se encontró ningún concierto con el ID especificado.');
        }
      },
      error: (error) => {
        console.error('Error al buscar concierto:', error);
      }
    });
  }
  
  resetBusqueda(): void {
    this.busquedaId = '';
    this.cargarConciertos();
  }
  
  cargarConciertos(): void {
    this.conciertosService.getConciertos().subscribe({
      next: (conciertos) => {
        this.conciertos = conciertos;
        this.conciertosOriginales = [...conciertos]; // Backup de los datos originales
      },
      error: (error) => {
        console.error('Error al cargar los conciertos:', error);
      }
    });
  }


  imprimirConciertos() {
    const tabla: HTMLElement | null = document.getElementById('tablaConciertos');
  
    if (tabla) {
      // Clonar la tabla para manipularla sin afectar la tabla original
      const tablaClone = tabla.cloneNode(true) as HTMLElement;
  
      // Remover la columna "Ruta Carrusel" y "Acciones" del encabezado
      const encabezados = tablaClone.querySelectorAll('th');
      if (encabezados) {
        /*encabezados[6]?.remove();*/ // Ruta Carrusel
        encabezados[7]?.remove(); // Acciones
      }
  
      // Remover las celdas correspondientes en cada fila
      const filas = tablaClone.querySelectorAll('tbody tr');
      filas.forEach((fila) => {
        const celdas = fila.querySelectorAll('td');
       /* celdas[6]?.remove();*/ // Ruta Carrusel
        celdas[7]?.remove(); // Acciones
      });
  
      // Abrir ventana para imprimir
      const ventana = window.open('', '', 'height=600,width=800');
      ventana?.document.write('<html><head><title>Imprimir Tabla</title><style>');
      ventana?.document.write('table { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; }');
      ventana?.document.write('th, td { border: 1px solid #000; padding: 8px; text-align: left; }');
      ventana?.document.write('th { background-color: #f2f2f2; }');
      ventana?.document.write('</style></head><body>');
      ventana?.document.write('<h2>Tabla de Conciertos</h2>');
      ventana?.document.write(tablaClone.outerHTML);
      ventana?.document.write('</body></html>');
      ventana?.document.close();
      ventana?.print();
    } else {
      console.error('Tabla no encontrada');
    }
  }
  
}


