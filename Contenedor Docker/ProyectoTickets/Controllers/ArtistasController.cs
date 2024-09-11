
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoTickets.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProyectoTickets.Controllers

{

    [Route("api/[controller]")]  // Define la ruta base para este controlador
    [ApiController] // Indica que este es un controlador de API


    public class ArtistasController : ControllerBase
    {
        private readonly AppDbContext _context; // Campo privado para almacenar el contexto de la base de datos



        // Constructor que inyecta el contexto de la base de datos

        public ArtistasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]  // Indica que este método responde a solicitudes HTTP GET
        public async Task<ActionResult<IEnumerable<Artista>>> GetArtistas()
        {

            // Devuelve una lista de todos los artistas de la base de datos de forma asíncrona
            return await _context.Artistas.ToListAsync();
        }
    }
}
