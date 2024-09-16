import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre: string='';
  email: string = ''; // Inicializar con una cadena vacía
  password: string = ''; // Inicializar con una cadena vacía
  


  onSubmit() {
    // Manejar el envío del formulario
    console.log('Nombre:', this.nombre);
    console.log('Email:', this.email);
    console.log('Password:', this.password);

  }
}

