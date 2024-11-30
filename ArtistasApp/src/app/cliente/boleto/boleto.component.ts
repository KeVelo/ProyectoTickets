import { Component, OnInit } from '@angular/core';
import { BoletosService } from '../../services/boletos.service';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css']
})
export class BoletoComponent implements OnInit {
  boletos: any[] = []; // Array para almacenar los boletos validados.

  constructor(private boletosService: BoletosService) {}

  ngOnInit(): void {
    this.cargarBoletos();
  }

  cargarBoletos(): void {
    this.boletosService.getBoletos().subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);
        this.boletos = response.filter((boleto: any) => boleto.status?.toLowerCase() === 'aprobado');

        console.log('Boletos filtrados (aprobados):', this.boletos);
      },
      (error) => {
        console.error('Error al cargar los boletos:', error);
      }
    );
  }
  
}
