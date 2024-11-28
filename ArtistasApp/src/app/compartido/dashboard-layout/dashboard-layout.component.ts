import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta al servicio sea correcta
import { Router } from '@angular/router'; // Para redirigir después de cerrar sesión

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
  encapsulation: ViewEncapsulation.None, // Encapsulamiento predeterminado
})
export class DashboardLayoutComponent implements OnInit {
  userName: string = ''; // Variable para almacenar el nombre del usuario

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.setupSidebarToggle();
    this.loadUserName(); // Llama al método para cargar el nombre del usuario
  }

  // Función para manejar el toggle del sidebar
  setupSidebarToggle(): void {
    const menuIcon = document.querySelector('.bx-menu');
    const sidebar = document.getElementById('sidebar');

    if (menuIcon && sidebar) {
      menuIcon.addEventListener('click', () => {
        sidebar.classList.toggle('hide');
      });
    }
  }

  // Función para cargar el nombre del usuario desde AuthService
  loadUserName(): void {
    const userInfo = this.authService.getUserInfo();
    this.userName = userInfo?.nombre || 'Usuario'; // Si no hay nombre, usa 'Usuario' como predeterminado
  }

  // Función para cerrar sesión
  logout(): void {
    this.authService.logout(); // Llama al método logout del servicio
    this.router.navigate(['/admin']); // Redirige a la página de inicio de sesión
  }
}
