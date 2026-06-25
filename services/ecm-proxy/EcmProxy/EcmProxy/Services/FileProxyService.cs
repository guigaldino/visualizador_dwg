using EcmProxy.Configurations;
using EcmProxy.Models;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;

namespace EcmProxy.Services
{
    public class FileProxyService : IFileProxyService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ProxyOptions _proxyOptions;

        public FileProxyService(IHttpClientFactory httpClientFactory, IOptions<ProxyOptions> options)
        {
            _httpClientFactory = httpClientFactory;
            _proxyOptions = options.Value;
        }

        public async Task<List<FileEntry>> ObterArquivosAsync(TokenPayload payload, CancellationToken cancellationToken = default)
        {
            var client = CriarCliente(payload);

            
        }

        public async Task<ProxyResult> ObterFluxoArquivoAsync(TokenPayload payload, int idArquivo, CancellationToken cancellationToken = default) {
            var client = CriarCliente(payload);

        }

        private HttpClient CriarCliente(TokenPayload payload) {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(payload.UrlOrigem);
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("bearer", payload.TokenSistema);

            return client;
        }

        //private async GetAnexosAsync() - Buscar lista de anexos do ECM

        // Buscar path de um determinado anexo
    }
}
