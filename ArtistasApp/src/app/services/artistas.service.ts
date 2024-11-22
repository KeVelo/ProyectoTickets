import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistasService {
  private apiUrl = 'http://api.159.223.175.204.nip.io/api/conciertos'; // URL del endpoint de conciertos
  private localidadesUrl = 'http://api.159.223.175.204.nip.io/api/localidades'; // URL del endpoint de localidades

  constructor(private http: HttpClient) { }

  // Método para obtener el token JWT del localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Método para obtener la lista de conciertos con autenticación
  getConciertos(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los datos:', error);
        return throwError(() => new Error('Error al obtener los datos. Verifica tu autenticación.'));
      })
    );
  }

  // Método para obtener un concierto por ID
  getConciertoById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los detalles del concierto:', error);
        return throwError(() => new Error('Error al obtener los detalles del concierto.'));
      })
    );
  }

  // Método para buscar un concierto por nombre
  buscarConcierto(nombre: string): Observable<any | null> {
    const headers = this.getAuthHeaders();
    return this.getConciertos().pipe(
      map(conciertos => conciertos.find(concierto => concierto.nombre_concierto.toLowerCase().includes(nombre.toLowerCase())) || null),
      catchError(error => {
        console.error('Error en la búsqueda de concierto:', error);
        return throwError(() => new Error('Error al buscar el concierto.'));
      })
    );
  }

  // Método para obtener las localidades de un concierto por ID de concierto
  getLocalidades(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.localidadesUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener las localidades:', error);
        return throwError(() => new Error('Error al obtener las localidades.'));
      })
    );
  }
  
}
