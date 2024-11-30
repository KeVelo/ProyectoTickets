import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConciertosService {
  private API_URL = 'http://api.159.223.175.204.nip.io/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getConciertos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/conciertos`, { headers: this.getHeaders() });
  }

  createConcierto(concierto: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/conciertos`, concierto, { headers: this.getHeaders() });
  }

  updateConcierto(id: number, concierto: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/conciertos/${id}`, concierto, { headers: this.getHeaders() });
  }

  deleteConcierto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/conciertos/${id}`, { headers: this.getHeaders() });
  }


  getLugares(): Observable<any[]> {
    const url = 'http://api.159.223.175.204.nip.io/api/lugares'; // URL del endpoint de lugares
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }


  getConciertoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/conciertos/${id}`, { headers: this.getHeaders() });
  }
  
  
}
