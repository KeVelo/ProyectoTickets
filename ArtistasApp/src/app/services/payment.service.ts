import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/pagos';

  constructor(private http: HttpClient) {}

  createPaymentSession(paymentData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const fechaActual = new Date();
    const hora = fechaActual.toTimeString().split(' ')[0];

    const requestBody = {
      idBoleto: paymentData.idBoleto,
      monto: paymentData.monto,
      estado: paymentData.estado,
      fechaCreacion: fechaActual.toISOString(),
      fechaTransaccion: fechaActual.toISOString(),
      horaTransaccion: hora,
      metodoPago: paymentData.metodoPago,
      descripcion: "Compra de boletos"
    };

    console.log('Request body:', requestBody);
    return this.http.post(`${this.apiUrl}/crear`, requestBody, { headers });
  }
}
