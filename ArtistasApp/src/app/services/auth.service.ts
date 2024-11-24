import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from '../login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://api.159.223.175.204.nip.io/api';

  constructor(private http: HttpClient, private router: Router) {}

  register(nombre: string, email: string, password: string, idRol: number): Observable<any> {
    const url = `${this.baseUrl}/usuarios`;
    const body = {
      nombre,
      email,
      password,
      id_rol: idRol
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers }).pipe(
      tap(response => {
        localStorage.setItem('userName', nombre);
      }),
      catchError(error => {
        console.error('Error en el registro:', error);
        if (error.status === 422) {
          return throwError(() => new Error('Error de validación: Verifica los campos ingresados.'));
        }
        return throwError(() => new Error('Error al registrar el usuario. Intenta de nuevo más tarde.'));
      })
    );
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<LoginResponse>(url, body.toString(), { headers }).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem('jwtToken', response.access_token);
          localStorage.setItem('userEmail', username);
        }
      }),
      catchError(error => {
        console.error('Error en el inicio de sesión:', error);
        if (error.status === 401) {
          return throwError(() => new Error('Credenciales incorrectas. Verifica tu usuario y contraseña.'));
        }
        return throwError(() => new Error('Error al iniciar sesión. Intenta de nuevo más tarde.'));
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}