import { Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

export interface Concierto {
  id_concierto?: number;
  id_lugar: number;
  nombre_concierto: string;
  fecha_concierto: Date;
  hora_inicio: string;
  hora_apertura: string;
  precio_base: number;
  imagen_concierto?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConciertosAgregarService {
  private apiUrl = 'http://159.223.175.204/api/conciertos'; // Ajusta esta URL al backend que crearás

  constructor(private http: HttpClient) { }

  // Crear nuevo concierto
  crearConcierto(concierto: Concierto): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, concierto);
  }

  // Obtener todos los conciertos
  //obtenerConciertos(): Observable<Concierto[]> {
    //return this.http.get<Concierto[]>(`${this.apiUrl}/conciertos`);
  //}

  // Método para obtener el token JWT del localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Método para obtener la lista de conciertos con autenticación
  getConciertos(): Observable<Concierto[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los datos:', error);
        return throwError(() => new Error('Error al obtener los datos. Verifica tu autenticación.'));
      })
    );
  }


  // Actualizar concierto
  actualizarConcierto(concierto: Concierto): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar/${concierto.id_concierto}`, concierto);
  }

  // Eliminar concierto
  eliminarConcierto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}