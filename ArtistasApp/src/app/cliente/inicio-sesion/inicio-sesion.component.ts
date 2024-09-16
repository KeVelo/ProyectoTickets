import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  email: string = ''; // Inicializar con una cadena vacía
  password: string = ''; // Inicializar con una cadena vacía


  onSubmit() {
    // Manejar el envío del formulario
    console.log('Email:', this.email);
    console.log('Password:', this.password);

  }
}
