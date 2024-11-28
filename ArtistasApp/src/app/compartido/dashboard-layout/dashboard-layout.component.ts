import { Component, OnInit , ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
  encapsulation: ViewEncapsulation.None // Encapsulamiento predeterminado
})
export class DashboardLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setupSidebarToggle();
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
}
