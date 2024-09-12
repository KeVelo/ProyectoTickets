import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtistasListComponent } from './cliente/artistas-list/artistas-list.component'; 


// Definimos las rutas de nuestra aplicación
const routes: Routes = [
// Ruta para mostrar la lista de artistas
  { path: 'artistas', component: ArtistasListComponent },  // Ruta para el componente de artistas
  { path: '', redirectTo: '', pathMatch: 'full' },  // Ruta por defecto: redirige a la lista de artistas
  // Otras rutas que tengas
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
