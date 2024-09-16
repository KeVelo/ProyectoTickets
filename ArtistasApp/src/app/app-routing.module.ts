import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './cliente/inicio-sesion/inicio-sesion.component';
import { ArtistasListComponent } from './cliente/artistas-list/artistas-list.component'; 
import { PaginaPrincipalComponent } from './cliente/pagina-principal/pagina-principal.component';
import { RegistroComponent } from './cliente/registro/registro.component';


const routes: Routes = [
  { path: 'artistas', component: ArtistasListComponent }, // Ruta para el componente de artistas
  { path: 'inicio-sesion', component: InicioSesionComponent }, // Ruta para el componente de inicio de sesión
  { path: 'registro', component: RegistroComponent }, // Ruta para el componente de registro
  { path: '', component: PaginaPrincipalComponent }, // Ruta por defecto que muestra PaginaPrincipalComponent
  { path: '**', redirectTo: '' } // Redirige a la ruta por defecto para cualquier ruta no reconocida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
