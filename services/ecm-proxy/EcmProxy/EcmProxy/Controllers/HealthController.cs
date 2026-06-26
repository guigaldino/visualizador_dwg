using Microsoft.AspNetCore.Mvc;

namespace EcmProxy.Controllers
{
    [ApiController]
    [Route("health")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult VerificarSaude()
        {
            return Ok(new { status = "Saudável", horario = DateTime.UtcNow });
        }
    }
}
