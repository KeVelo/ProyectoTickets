import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la app
})
export class ArtistasService {
  // URL de la API del backend

  private apiUrl = 'https://localhost:7245/api/artistas'; // URL del backend

// Inyectamos HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) { }

   // Método para obtener la lista de artistas del backend
  getArtistas(): Observable<any[]> {

      // Hacemos una petición GET a la API y devolvemos un Observable
    return this.http.get<any[]>(this.apiUrl);
  }
}
