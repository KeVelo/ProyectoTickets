import { Component } from '@angular/core';

import { Router } from '@angular/router';  // Asegúrate de tener esta línea correctamente

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router) {}

  // Método para navegar a la ruta correspondiente
  navigateTo(route: string) {
    if (route === 'conciertoscrud') {
      this.router.navigate(['/conciertoscrud']); // Redirige a /boletos
    } else if (route === 'localidades') {
      this.router.navigate(['/localidades']); // Redirige a /vendidos
    }
  }
}


