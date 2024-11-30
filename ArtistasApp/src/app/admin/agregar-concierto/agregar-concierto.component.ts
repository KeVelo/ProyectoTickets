import { Component,  OnInit} from '@angular/core';

import { ConciertosAgregarService, Concierto } from 'src/app/services/conciertos-agregar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-concierto',
  templateUrl: './agregar-concierto.component.html',
  styleUrls: ['./agregar-concierto.component.css']
 
})
export class AgregarConciertoComponent implements OnInit{
  conciertosForm: FormGroup;
  conciertos: Concierto[] = [];
  conciertoEditando: Concierto | null = null;

  lugares = [
    { id: 1, nombre: 'Lugar 1' },
    { id: 2, nombre: 'Lugar 2' },
    { id: 3, nombre: 'Lugar 3' }
  ];

  constructor(
    private fb: FormBuilder,
    private conciertoService: ConciertosAgregarService
  ) {
    this.conciertosForm = this.fb.group({
      nombre_concierto: ['', Validators.required],
      fecha_concierto: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_apertura: ['', Validators.required],
      precio_base: ['', [Validators.required, Validators.min(0)]],
      id_lugar: ['', Validators.required],
      imagen_concierto: [''],
      ruta_concierto_carrusel: [''],
      estado: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarConciertos();
  }

  cargarConciertos() {
    this.conciertoService.getConciertos().subscribe(
      (data) => {
        console.log('Conciertos cargados:', data); // Verificar la estructura de la respuesta
        this.conciertos = data;
      },
      (error) => {
        console.error('Error al cargar conciertos', error);
        alert('No se pudieron cargar los conciertos');
      }
    );
  }

  guardarConcierto() {
    if (this.conciertosForm.valid) {
      const concierto = this.conciertosForm.value;

      if (this.conciertoEditando) {
        // Actualizar concierto
        concierto.id_concierto = this.conciertoEditando.id_concierto;
        this.conciertoService.actualizarConcierto(concierto).subscribe(
          () => {
            this.cargarConciertos();
            this.resetFormulario();
            alert('Concierto actualizado exitosamente');
          },
          (error) => {
            console.error('Error al actualizar', error);
            alert('No se pudo actualizar el concierto');
          }
        );
      } else {
        // Crear nuevo concierto
        this.conciertoService.crearConcierto(concierto).subscribe(
          () => {
            this.cargarConciertos();
            this.resetFormulario();
            alert('Concierto agregado exitosamente');
          },
          (error) => {
            console.error('Error al crear', error);
            alert('No se pudo agregar el concierto');
          }
        );
      }
    }
  }
 
  resetFormulario() {
    this.conciertosForm.reset();
    this.conciertoEditando = null;
  }

  getLugarNombre(id_lugar: number): string {
    const lugar = this.lugares.find(l => l.id === id_lugar);
    return lugar ? lugar.nombre : 'N/A';
  }


  editarConcierto(concierto: Concierto) {
    this.conciertoEditando = concierto;
    this.conciertosForm.patchValue({
      nombre_concierto: concierto.nombre_concierto,
      fecha_concierto: concierto.fecha_concierto,
      hora_inicio: concierto.hora_inicio,
      hora_apertura: concierto.hora_apertura,
      precio_base: concierto.precio_base,
      id_lugar: concierto.id_lugar,
      estado: concierto.estado
      
    });
  }

  eliminarConcierto(concierto: Concierto) {
    if (concierto.id_concierto !== undefined) {
      if (confirm('¿Estás seguro de eliminar este concierto?')) {
        this.conciertoService.eliminarConcierto(concierto.id_concierto).subscribe(
          () => {
            this.cargarConciertos();
            alert('Concierto eliminado exitosamente');
          },
          (error) => {
            console.error('Error al eliminar', error);
            alert('No se pudo eliminar el concierto');
          }
        );
      }
    } else {
      alert('No se puede eliminar un concierto sin ID');
    }
  }

  
  imprimirConciertos() {
    const tabla: HTMLElement | null = document.getElementById('tablaConciertos');
    
    if (tabla) {
      const ventana = window.open('', '', 'height=600,width=800');
      ventana?.document.write('<html><head><title>Imprimir Tabla</title><style>');
      ventana?.document.write('table { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; }');
      ventana?.document.write('th, td { border: 1px solid #000; padding: 8px; text-align: left; }');
      ventana?.document.write('th { background-color: #f2f2f2; }');
      ventana?.document.write('</style></head><body>');
      ventana?.document.write('<h2>Tabla de Conciertos</h2>');
      ventana?.document.write(tabla.outerHTML);
      ventana?.document.write('</body></html>');
      ventana?.document.close();
      ventana?.print();
    } else {
      console.error('Tabla no encontrada');
    }
  }
  
}
