using System.Diagnostics;

namespace EcmProxy.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _proximo;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(RequestDelegate proximo, ILogger<RequestLoggingMiddleware> logger)
        {
            _proximo = proximo;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext contexto)
        {
            var cronometro = Stopwatch.StartNew();

            try
            {
                await _proximo(contexto);
            }
            finally {
                cronometro.Stop();

                _logger.LogInformation(
                    "{Metodo} {Rota} -> {CodigoStatus} em {Duracao}ms",
                    contexto.Request.Method,
                    contexto.Request.Path,
                    contexto.Response.StatusCode,
                    cronometro.ElapsedMilliseconds);
            }
        }
    }
}
