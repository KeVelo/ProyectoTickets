import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://api.159.223.175.204.nip.io/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.API_URL}/login`;
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers }).pipe(
      tap((response) => {
        if (response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_info', JSON.stringify(response.user_info));
          console.log('Token almacenado:', response.access_token);

          // Notificar que el usuario ha iniciado sesión
          this.isLoggedInSubject.next(true);
        } else {
          throw new Error('No se recibió el token de acceso.');
        }
      }),
      catchError((error) => {
        console.error('Error en el login:', error);
        return throwError(() => new Error(error.error?.detail || 'Error en el login.'));
      })
    );
  }

  register(nombre: string, apellido: string, email: string, password: string): Observable<any> {
    const url = `${this.API_URL}/usuarios`;
    const body = { nombre, apellido, email, password, id_rol: 1 };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers }).pipe(
      tap((response) => {
        console.log('Registro exitoso:', response);
      }),
      catchError((error) => {
        console.error('Error en el registro:', error);
        return throwError(() => new Error(error.error?.detail || 'Error en el registro.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    console.log('Cierre de sesión exitoso.');

    // Notificar que el usuario ha cerrado sesión
    this.isLoggedInSubject.next(false);
  }

  getUserInfo(): any {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  getUserName(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo?.email?.split('@')[0] || null; // Extrae la parte antes del "@"
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token; // Devuelve true si el token existe
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
