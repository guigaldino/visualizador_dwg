using System.Net;

namespace EcmProxyTests.Helpers
{
    internal class MockHttpMessageHandler : HttpMessageHandler
    {
        private readonly Dictionary<string, Func<HttpResponseMessage>> _rotas = new();

        public void ConfigurarRota(string caminho, Func<HttpResponseMessage> fabricarResposta)
        {
            _rotas[caminho] = fabricarResposta;
        }

        protected override Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var caminho = request.RequestUri?.AbsolutePath ?? "/";

            if (_rotas.TryGetValue(caminho, out var fabricar))
                return Task.FromResult(fabricar());

            return Task.FromResult(new HttpResponseMessage(HttpStatusCode.NotFound));
        }
    }
}