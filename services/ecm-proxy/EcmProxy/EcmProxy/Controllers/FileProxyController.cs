using EcmProxy.Models;
using EcmProxy.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcmProxy.Controllers
{
    [ApiController]
    [Route("api/proxy")]
    public class FileProxyController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IFileProxyService _fileProxyService;

        public FileProxyController(ITokenService tokenService, IFileProxyService fileProxyService)
        {
            _tokenService = tokenService;
            _fileProxyService = fileProxyService;
        }

        [HttpGet("files")]
        public async Task<ActionResult<List<Anexo>>> ObterArquivos([FromQuery] string token, CancellationToken cancellationToken)
        {
            var payload = _tokenService.Descriptografar(token);
            var resultado = await _fileProxyService.ObterArquivosAsync(payload, cancellationToken);
            return Ok(resultado);
        }

        [HttpGet("files/{anexoId}/stream")]
        public async Task<IActionResult> ObterStreamArquivo(int anexoId, [FromQuery] string token, CancellationToken cancellationToken)
        {
            var payload = _tokenService.Descriptografar(token);
            var resultado = await _fileProxyService.ObterStreamsArquivoAsync(payload, anexoId, cancellationToken);

            if(resultado.ContentDisposition is not null)
                Response.Headers.Append("Content-Disposition", resultado.ContentDisposition);

            return File(resultado.Content, resultado.ContentType);
        }

    }
}
