using EcmProxy.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace EcmProxy.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _proximo;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate proximo, ILogger<ErrorHandlingMiddleware> logger)
        {
            _proximo = proximo;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext contexto)
        {
            try
            {
                await _proximo(contexto);
            }
            catch(TokenExpiredException ex) 
            {
                await EscreverProblema(contexto, StatusCodes.Status401Unauthorized, 
                    "Token expirado", ex.Message);
            }
            catch (TokenInvalidException ex)
            {
                await EscreverProblema(contexto, StatusCodes.Status401Unauthorized,
                    "Token inválido.", ex.Message);
            }
            catch (TokenMalformedException ex)
            {
                await EscreverProblema(contexto, StatusCodes.Status400BadRequest,
                    "Token malformado.", ex.Message);
            }
            catch (FileNotFoundException ex)
            {
                await EscreverProblema(contexto, StatusCodes.Status404NotFound,
                    "Arquivo não encontrado.", ex.Message);
            }
            catch (ProxyException ex)
            {
                await EscreverProblema(contexto, StatusCodes.Status502BadGateway,
                    "Erro no servidor ECM.", ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro inesperado não tratado.");
                await EscreverProblema(contexto, StatusCodes.Status500InternalServerError,
                    "Erro interno.", "Ocorreu um erro inesperado.");
            }
        }

        private static async Task EscreverProblema(HttpContext contexto, int codigoStatus, string titulo, string detalhe)
        {
            if (contexto.Response.HasStarted)
                return;

            contexto.Response.StatusCode = codigoStatus;

            var problema = new ProblemDetails
            {
                Status = codigoStatus,
                Title = titulo,
                Detail = detalhe
            };

            await contexto.Response.WriteAsJsonAsync(problema, options: null, contentType: "application/problem+json");
        }
    }
}
