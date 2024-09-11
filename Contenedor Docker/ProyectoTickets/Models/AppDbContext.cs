using ProyectoTickets.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Artista> Artistas { get; set; } // Define un conjunto de entidades Artista en la base de datos

    // Constructor que acepta opciones de configuración para el contexto de la base de datos
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
