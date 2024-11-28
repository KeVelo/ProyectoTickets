import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistasListComponent } from './cliente/artistas-list/artistas-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaPrincipalComponent } from './cliente/pagina-principal/pagina-principal.component';
import { InicioSesionComponent } from './cliente/inicio-sesion/inicio-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './compartido/header/header.component';
import { FooterComponent } from './compartido/footer/footer.component';
import { RegistroComponent } from './cliente/registro/registro.component';
import { ProcesoCompraComponent } from './cliente/proceso-compra/proceso-compra.component';
import { SeleccionBoletosComponent } from './cliente/seleccion-boletos/seleccion-boletos.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DetalleListaComponent } from './admin/detalle-lista/detalle-lista.component';
import { DetalleBoletosComponent } from './admin/detalle-boletos/detalle-boletos.component';
import { AgregarConciertoComponent } from './admin/agregar-concierto/agregar-concierto.component';
import { TotalBoletosComponent } from './admin/total-boletos/total-boletos.component';
import { NuevoAdminComponent } from './admin/nuevo-admin/nuevo-admin.component';
import { DashboardLayoutComponent } from './compartido/dashboard-layout/dashboard-layout.component';


//crud

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { SuggestionsComponent } from './cliente/suggestions/suggestions.component';
import { ModalComponent } from './compartido/modal/modal.component';
import { BoletoComponent } from './cliente/boleto/boleto.component';
import { RouterModule } from '@angular/router';


@NgModule({

   // Declaramos los componentes que usamos en nuestra app
  declarations: [
    AppComponent,
    ArtistasListComponent,
    PaginaPrincipalComponent,
    InicioSesionComponent,

    HeaderComponent,
    FooterComponent,
    RegistroComponent,
    ProcesoCompraComponent,
    SeleccionBoletosComponent,
    DashboardComponent,
    DetalleListaComponent,
    DetalleBoletosComponent,
    AgregarConciertoComponent,
    TotalBoletosComponent,
    NuevoAdminComponent,
    DashboardLayoutComponent,

    LoginAdminComponent,
    SuggestionsComponent,
    ModalComponent,
    BoletoComponent,
  


    
  ],

   // Importamos los módulos necesarios
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,// Necesario para hacer peticiones HTTP
    BrowserAnimationsModule,   
    FormsModule,
    ReactiveFormsModule,
    RouterModule,



    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,

    MatToolbarModule,
    MatIconModule,
    MatDialogModule,

    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
