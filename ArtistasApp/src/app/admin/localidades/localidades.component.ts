import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalidadesService } from 'src/app/services/localidades.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.css']
})
export class LocalidadesComponent implements OnInit {
  localidadesForm: FormGroup;
  localidades: any[] = [];
  conciertos: any[] = [];
  localidadEditando: any = null;

  constructor(
    private fb: FormBuilder,
    private localidadesService: LocalidadesService,
    private authService: AuthService
  ) {
    this.localidadesForm = this.fb.group({
      id_concierto: ['', Validators.required],
      platinum_precio: [0, [Validators.required, Validators.min(0)]],
      vip_precio: [0, [Validators.required, Validators.min(0)]],
      general_precio: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadLocalidades();
    this.loadConciertos();
  }

  loadLocalidades(): void {
    this.localidadesService.getLocalidades().subscribe((data) => {
      this.localidades = data;
    });
  }

  loadConciertos(): void {
    // Llama al servicio de conciertos para obtener los conciertos.
    this.localidadesService.getConciertos().subscribe((data) => {
      this.conciertos = data.map((concierto: any) => ({
        id: concierto.id_concierto, // ID que usaremos como valor en el select
        nombre_concierto: concierto.nombre_concierto // Nombre visible en el select
      }));
    });
  }
  
  editarLocalidad(localidad: any): void {
    this.localidadEditando = localidad;
    this.localidadesForm.patchValue(localidad);
  }

  eliminarLocalidad(localidad: any): void {
    if (confirm('¿Seguro que deseas eliminar esta localidad?')) {
      this.localidadesService.deleteLocalidad(localidad.id_localidad).subscribe(() => {
        this.loadLocalidades();
      });
    }
  }

  resetFormulario(): void {
    this.localidadesForm.reset();
    this.localidadEditando = null;
  }


  guardarLocalidad(): void {
    if (this.localidadesForm.valid) {
      const localidadData = {
        ...this.localidadesForm.value,
        id_concierto: Number(this.localidadesForm.value.id_concierto) // Aseguramos que sea un número
      };
  
      if (this.localidadEditando) {
        // Si se está editando una localidad existente
        this.localidadesService.updateLocalidad(this.localidadEditando.id_localidad, localidadData)
          .subscribe({
            next: () => {
              this.loadLocalidades();
              this.resetFormulario();
            },
            error: (error) => {
              console.error('Error al actualizar la localidad:', error);
              alert('Hubo un error al intentar actualizar la localidad.');
            }
          });
      } else {
        // Si se está creando una nueva localidad
        this.localidadesService.createLocalidad(localidadData)
          .subscribe({
            next: () => {
              this.loadLocalidades();
              this.resetFormulario();
            },
            error: (error) => {
              console.error('Error al crear la localidad:', error);
              alert('Hubo un error al intentar crear la localidad.');
            }
          });
      }
    } else {
      alert('Por favor, completa todos los campos del formulario correctamente.');
    }
  }
  
  imprimirLocalidades() {
    const tabla: HTMLElement | null = document.querySelector('.table-responsive'); // Selección por clase
    
    if (tabla) {
      const ventana = window.open('', '', 'height=600,width=800');
      ventana?.document.write('<html><head><title>Imprimir Localidades</title><style>');
      ventana?.document.write(`
        table {
          width: 100%;
          border-collapse: collapse;
          font-family: Arial, sans-serif;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
        }
      `);
      ventana?.document.write('</style></head><body>');
      ventana?.document.write('<h2 class="text-center">Localidades y Precios</h2>');
      ventana?.document.write(tabla.outerHTML); // Imprime la tabla seleccionada
      ventana?.document.write('</body></html>');
      ventana?.document.close();
      ventana?.print();
    } else {
      console.error('Tabla no encontrada');
    }
  }

    
    
    
  


}




  