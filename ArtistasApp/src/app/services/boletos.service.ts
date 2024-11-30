import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoletosService {
  private boletosUrl = 'http://api.159.223.175.204.nip.io/api/boletos';
  private transaccionesUrl = 'http://api.159.223.175.204.nip.io/api/transacciones';
  

  constructor(private http: HttpClient) {}

  // Encabezados de autenticación
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
  

  // Crear un boleto
  crearBoleto(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log('Cuerpo enviado al servidor (crearBoleto):', data);
    return this.http.post<any>(this.boletosUrl, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear boleto:', error);
        if (error.error && error.error.detail) {
          console.error('Detalles del error:', error.error.detail);
        }
        return throwError(() => new Error('Error al crear el boleto.'));
      })
    );
  }
  
  

  // Validar un boleto
  validarBoleto(idBoleto: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.boletosUrl}/api/validate/${idBoleto}`, { headers }).pipe(
      catchError((error) => {
        console.error(`Error al validar el boleto con ID ${idBoleto}:`, error);
        return throwError(() => new Error('Error al validar el boleto.'));
      })
    );
  }
  

  // Crear una transacción
  crearTransaccion(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.transaccionesUrl, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error al crear la transacción:', error);
        return throwError(() => new Error('Error al crear la transacción.'));
      })
    );
  }

  // Obtener boletos por el usuario actual
  getBoletos(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.boletosUrl}/by_current_user_id`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener los boletos:', error);
        return throwError(() => new Error('Error al obtener los boletos.'));
      })
    );
  }
  
  
  
  
  
}
