import { Component, OnInit } from '@angular/core';
import { BoletosService } from '../../services/boletos.service';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css'],
})
export class BoletoComponent implements OnInit {
  boletos: any[] = []; // Array para almacenar los boletos aprobados.

  constructor(private boletosService: BoletosService) {}

  ngOnInit(): void {
    this.cargarBoletos();
  }

  cargarBoletos(): void {
    this.boletosService.getBoletos().subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);
  
        // Filtrar boletos aprobados
        this.boletos = response.filter((boleto: any) => boleto.status.toLowerCase() === 'aprobado');
        
        // Verificar los valores de qr_imagen
        this.boletos.forEach((boleto) => {
          console.log(`QR del boleto #${boleto.id_boleto}:`, boleto.qr_imagen);
        });
  
        console.log('Boletos aprobados:', this.boletos);
      },
      (error) => {
        console.error('Error al cargar los boletos:', error);
      }
    );
  }
  
}
