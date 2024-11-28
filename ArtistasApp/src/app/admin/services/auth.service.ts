import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://api.159.223.175.204.nip.io/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient) {}

  // Login del usuario
  login(username: string, password: string): Observable<any> {
    const url = `${this.API_URL}/usuarios/login`;
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, body, { headers }).pipe(
      tap((response) => {
        if (response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
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

  // Obtener la información del usuario
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No se encontró el token de acceso.');
    }

    const url = `${this.API_URL}/usuarios/me`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<any>(url, { headers }).pipe(
      tap((userInfo) => {
        console.log('Información del usuario:', userInfo);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
      }),
      catchError((error) => {
        console.error('Error al obtener la información del usuario:', error);
        return throwError(() => new Error('No se pudo obtener la información del usuario.'));
      })
    );
  }

  // Verificar si el usuario tiene el rol admin
  isAdmin(): boolean {
    const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
    return userInfo?.roles?.includes('admin') || false;
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    this.isLoggedInSubject.next(false);
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
