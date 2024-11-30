import { Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,map} from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Concierto {
  id_concierto?: number;
  id_lugar: number;
  nombre_concierto: string;
  fecha_concierto: Date;
  hora_inicio: string;
  hora_apertura: string;
  precio_base: number;
 
  ruta_carrusel?: string;  // Asegúrate de que esté en la interfaz
  ruta_concierto_carrusel ? : string;
  estado: string;

  
}

@Injectable({
  providedIn: 'root'
})
export class ConciertosAgregarService {
  private apiUrl = 'http://api.159.223.175.204.nip.io/api/conciertos'; // Ajusta esta URL al backend que crearás
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  

 



  // Método para obtener el token JWT del localStorage
private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

 /*private getHeaders(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });
}*/

/*getConcerts(): Observable<Concierto[]> {
  return this.http.get<Concierto[]>(this.apiUrl, { headers: this.getHeaders() });
}*/

  
  // Método para obtener la lista de conciertos con autenticación
  getConciertos(): Observable<Concierto[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Concierto[]>(this.apiUrl, { headers }).pipe(
      map(conciertos => {
        return conciertos.map(concierto => {
          //Verificar si la ruta es relativa y agregar la ruta base si es necesario
          if (concierto.ruta_carrusel && !concierto.ruta_carrusel.startsWith('/')) {
           concierto.ruta_carrusel = '/assets/carrusel/' + concierto.ruta_carrusel; // Concatenar el prefijo adecuado
          }
          // Nuevo campo ruta_concierto_carrusel
          if (concierto.ruta_concierto_carrusel && !concierto.ruta_concierto_carrusel.startsWith('/')) {
            concierto.ruta_concierto_carrusel = '/assets/concierto-carrusel/' + concierto.ruta_concierto_carrusel; // Agregar prefijo
          }
          return concierto;
        });
      }),
      catchError(error => {
        console.error('Error al obtener los datos:', error);
       return throwError(() => new Error('Error al obtener los datos. Verifica tu autenticación.'));
      })
   );
}
  
  crearConcierto(concierto: Concierto): Observable<Concierto> {
    return this.http.post<Concierto>(this.apiUrl, concierto, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error al crear el concierto:', error);  
        return throwError(error);
      })
    );
  }
  



 // Método para obtener un concierto por ID
 /*getConciertoById(id: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.get<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
    catchError(error => {
      console.error('Error al obtener los detalles del concierto:', error);
      return throwError(() => new Error('Error al obtener los detalles del concierto.'));
    })
  );
}*/


  


  // Actualizar concierto
  actualizarConcierto(concierto: Concierto): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar/${concierto.id_concierto}`, concierto);
  }

  // Eliminar concierto
  eliminarConcierto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}