import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistasListComponent } from './cliente/artistas-list/artistas-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaPrincipalComponent } from './cliente/pagina-principal/pagina-principal.component';

@NgModule({

   // Declaramos los componentes que usamos en nuestra app
  declarations: [
    AppComponent,
    ArtistasListComponent,
    PaginaPrincipalComponent
  ],

   // Importamos los módulos necesarios
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,// Necesario para hacer peticiones HTTP
    BrowserAnimationsModule,   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
