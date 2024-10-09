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
    if (route === 'vendido') {
      this.router.navigate(['/vendido']); // Redirige a /boletos
    } else if (route === 'totalboletos') {
      this.router.navigate(['/totalboletos']); // Redirige a /vendidos
    }
  }
}


