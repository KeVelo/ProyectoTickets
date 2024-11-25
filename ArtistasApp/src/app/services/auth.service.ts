import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://api.159.223.175.204.nip.io/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`; // Endpoint del login
    const body = { username, password }; // Credenciales a enviar
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers }).pipe(
      tap(response => {
        console.log('Respuesta del servidor:', response);

        // Verificar si el login fue exitoso
        if (!response || !response.access_token) {
          throw new Error('Login fallido. Verifica tus credenciales.');
        }

        // Guardar el token y la información del usuario
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_info', JSON.stringify(response.user_info));

        console.log('Usuario logueado:', response.user_info);
      }),
      catchError(error => {
        console.error('Error en el inicio de sesión:', error);
        const errorMsg = error.error?.detail || 'Error al iniciar sesión.';
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  register(nombre: string, apellido: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/usuarios`;
    const body = { 
      nombre, 
      apellido, 
      email, 
      password, 
      id_rol: 1 // Aseguramos que todos los registros sean para rol 1
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers }).pipe(
      tap(response => {
        console.log('Registro exitoso:', response);
      }),
      catchError(error => {
        console.error('Error en el registro:', error);
        return throwError(() => new Error(error.error.detail || 'Error al registrar el usuario.'));
      })
    );
  }

  getUserInfo(): any {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    console.log('Cierre de sesión exitoso.');
  }
}
