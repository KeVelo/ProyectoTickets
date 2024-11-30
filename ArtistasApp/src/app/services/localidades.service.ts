import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {
  private API_URL = 'http://api.159.223.175.204.nip.io/api/localidades';
  private conciertourl = 'http://api.159.223.175.204.nip.io/api';

 

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  getConciertos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.conciertourl}/conciertos`, { headers: this.getHeaders() });
  }
  
  getLocalidades(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL, { headers: this.getHeaders() });
  }



  updateLocalidad(id: number, localidad: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, localidad, { headers: this.getHeaders() });
  }

  deleteLocalidad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }


  createLocalidad(localidad: any): Observable<any> {
    return this.http.post<any>(this.API_URL, localidad, { headers: this.getHeaders() });
  }

 



   /* createLocalidad(localidad: any): Observable<any> {
    console.log('Datos enviados al endpoint de creación:', localidad);
    return this.http.post<any>(this.API_URL, localidad, { headers: this.getHeaders() });
  }*/
}
