using System;
using System.ComponentModel.DataAnnotations;

namespace ProyectoTickets.Models
{
    public class Artista
    {
        [Key] // Define la propiedad IdArtista como clave primaria
        public int IdArtista { get; set; } // Propiedad que representa el ID único del artista
        public string Nombre { get; set; }// Propiedad para almacenar el nombre del artista
        public string Lugar { get; set; }
        public DateTime FechaEvento { get; set; }
        public TimeSpan HoraApertura { get; set; }
        public TimeSpan HoraInicio { get; set; }


    }
}
