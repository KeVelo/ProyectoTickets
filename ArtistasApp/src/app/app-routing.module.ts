import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './cliente/inicio-sesion/inicio-sesion.component';
import { ArtistasListComponent } from './cliente/artistas-list/artistas-list.component'; 
import { PaginaPrincipalComponent } from './cliente/pagina-principal/pagina-principal.component';
import { RegistroComponent } from './cliente/registro/registro.component';
import { SeleccionBoletosComponent } from './cliente/seleccion-boletos/seleccion-boletos.component';
import { ProcesoCompraComponent } from './cliente/proceso-compra/proceso-compra.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TotalBoletosComponent } from './admin/total-boletos/total-boletos.component';
import { DetalleBoletosComponent } from './admin/detalle-boletos/detalle-boletos.component';
import { DetalleListaComponent } from './admin/detalle-lista/detalle-lista.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { RegistroAdminComponent } from './admin/registro-admin/registro-admin.component';
import { BoletoComponent } from './cliente/boleto/boleto.component';


const routes: Routes = [
  { path: 'artistas', component: ArtistasListComponent }, // Ruta para el componente de artistas
  
  { path: 'inicio-sesion', component: InicioSesionComponent }, // Ruta para el componente de inicio de sesión
  { path: 'registro', component: RegistroComponent }, // Ruta para el componente de registro
  { path: 'seleccion/:id', component: SeleccionBoletosComponent }, // Ruta para el componente de seleccion
  { path: 'compra', component: ProcesoCompraComponent }, // Ruta para el componente de proceso compra
  { path: 'boleto', component: BoletoComponent }, // Ruta para el componente de boleto
  { path: 'dashboard', component: DashboardComponent }, // Ruta para el componente de artistas
  { path: 'admin', component: LoginAdminComponent }, // Ruta para el componente de artistas
  { path: 'registro/admin', component: RegistroAdminComponent }, // Ruta para el componente de artistas
  { path: 'vendido', component: TotalBoletosComponent }, // Ruta para el componente de artistas
  { path: 'totalboletos', component: DetalleBoletosComponent }, // Ruta para el componente de artistas
  { path: 'lista', component: DetalleListaComponent }, // Ruta para el componente de artistas
  { path: '', component: PaginaPrincipalComponent }, // Ruta por defecto que muestra PaginaPrincipalComponent
  { path: '**', redirectTo: '' } // Redirige a la ruta por defecto para cualquier ruta no reconocida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
