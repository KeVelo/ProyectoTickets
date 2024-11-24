import { Component } from '@angular/core';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css']
})
export class BoletoComponent {
  boletos: any[] = []; // Array para simular los boletos. Por ahora, vacío para la prueba del estado sin boletos.

  constructor() {}

  ngOnInit(): void {
    // Aquí podrías cargar los boletos de un endpoint cuando esté disponible
    this.boletos = [
      {
        concierto: 'COLDPLAY',
        localidad: 'Platinum',
        cantidad: 2,
        precio: 190,
        fecha: '21 Sep 24',
        hora: '8:00 P.M',
        lugar: 'Teatro Presidente',
      },
    ]; // Datos quemados para prueba.
  }
}
