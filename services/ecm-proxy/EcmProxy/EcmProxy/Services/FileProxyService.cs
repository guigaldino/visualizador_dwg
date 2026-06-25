using EcmProxy.Configurations;
using EcmProxy.Exceptions;
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

        public async Task<List<Anexo>> ObterArquivosAsync(TokenPayload payload, CancellationToken cancellationToken = default)
        {
            var client = CriarCliente(payload);

            var anexos = await GetAnexosAsync(client, payload, cancellationToken);

            List<Anexo> dwgAnexos = anexos
            .Where(a => _proxyOptions.ExtensoesPermitidas
            .Contains(Path.GetExtension(a.Nome), StringComparer.OrdinalIgnoreCase))
            .ToList();

            var tasks = dwgAnexos.Select(anexo => GetUrlPathAnexoAsync(client, payload, anexo, cancellationToken));
            var response = await Task.WhenAll(tasks);

            return [..response];
        }

        public async Task<ProxyResult> ObterStreamsArquivoAsync(TokenPayload payload, int anexoId, CancellationToken cancellationToken = default) {
            var client = CriarCliente(payload);
            var anexos = await ObterArquivosAsync(payload, cancellationToken);

            var anexo = anexos.FirstOrDefault(anx => anx.Id == anexoId)
                ?? throw new FileNotFoundException($"Arquivo {anexoId} não encontrado.", anexoId.ToString());

            var response = await client.GetAsync(anexo.CaminhoUrl, HttpCompletionOption.ResponseHeadersRead, cancellationToken);

            if (!response.IsSuccessStatusCode)
                throw new ProxyException((int)response.StatusCode, anexoId);

            return new ProxyResult
            {
                Content = await response.Content.ReadAsStreamAsync(cancellationToken),
                ContentType = response.Content.Headers.ContentType?.MediaType ?? "application/octet-stream",
                ContentDisposition = $"inline; filename=\"{anexo.Nome}\""
            };
        }

        private HttpClient CriarCliente(TokenPayload payload) {
            var client = _httpClientFactory.CreateClient("EcmClient");
            client.BaseAddress = new Uri(payload.UrlOrigem);
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("bearer", payload.TokenSistema);

            return client;
        }

        private async Task<List<Anexo>> GetAnexosAsync(HttpClient client, TokenPayload payload, CancellationToken ct)
        {
            var response = await client.GetAsync($"api/v2/documentos/{payload.IdDocumento}/anexos", ct);

            if(!response.IsSuccessStatusCode)
            {
                throw new ProxyException((int)response.StatusCode, payload.IdDocumento);
            }

            return await response.Content.ReadFromJsonAsync<List<Anexo>>(ct) ?? [];
        }

        private async Task<Anexo> GetUrlPathAnexoAsync(HttpClient client, TokenPayload payload, Anexo anexo, CancellationToken ct)
        {
            var response = await client.GetAsync($"/api/v2/anexo/{anexo.Id}/path", ct);

            if (!response.IsSuccessStatusCode)
                throw new ProxyException((int)response.StatusCode, anexo.Id);

            var result = await response.Content.ReadFromJsonAsync<Anexo>(ct) ??
                throw new ProxyException(204, anexo.Id);

            anexo.CaminhoUrl = result.CaminhoUrl;
            
            return anexo;
        }
    }
}
