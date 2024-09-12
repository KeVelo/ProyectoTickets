import { Component, OnInit } from '@angular/core';
import { ArtistasService } from 'src/app/artistas.service';

@Component({
  selector: 'app-artistas-list',
  templateUrl: './artistas-list.component.html',
  styleUrls: ['./artistas-list.component.css']
})
export class ArtistasListComponent implements OnInit {

  // Array para almacenar los artistas obtenidos del servicio
  artistas: any[] = [];

  // Inyectamos el servicio ArtistasService en el constructor
  constructor(private artistasService: ArtistasService) { }

  // Este método se ejecuta automáticamente cuando se inicia el componente
  ngOnInit(): void {
    // Consumir el servicio y obtener los artistas desde la API
    // Llamamos al método getArtistas del servicio
    
    this.artistasService.getArtistas().subscribe
    // Si la petición es exitosa, guardamos los datos en el array 'artistas'
    (data => {
      this.artistas = data;
       // Si hay un error, lo mostramos en la consola
    }, error => {
      console.log('Error al obtener los datos', error);
    });
  }
}
