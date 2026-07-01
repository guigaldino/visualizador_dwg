using EcmProxy.Configurations;
using EcmProxy.Exceptions;
using EcmProxy.Models;
using EcmProxy.Services;
using Microsoft.Extensions.Options;
using Moq;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using EcmProxyTests.Helpers;

namespace EcmProxyTests.Unit
{
    public class FileProxyServiceTests
    {
        private readonly Mock<IHttpClientFactory> _mockFactory;
        private readonly ProxyOptions _opcoesPadrao;

        public FileProxyServiceTests()
        {
            _mockFactory = new Mock<IHttpClientFactory>();

            _opcoesPadrao = new ProxyOptions
            {
                ExtensoesPermitidas = [".dwg"],
                TamanhoBufferBytes = 81920,
                TimeoutSegundos = 30
            };
        }

        private FileProxyService CriarServico(MockHttpMessageHandler handler)
        {
            _mockFactory
                .Setup(f => f.CreateClient("EcmClient"))
                .Returns(new HttpClient(handler));

            return new FileProxyService(_mockFactory.Object, Options.Create(_opcoesPadrao));
        }

        private static TokenPayload CriarPayload() => new()
        {
            IdDocumento = 10,
            TokenSistema = "token-ecm-valido",
            UrlOrigem = "http://ecm-fake",
            IdUsuario = "usuario-01",
            TempoExpiracao = DateTime.UtcNow.AddHours(1)
        };

        [Fact]
        public async Task ObterArquivosAsync_ECMRetornaAnexos_RetornaApenasArquivosDwg()
        {
            // Arrange
            var handler = new MockHttpMessageHandler();

            handler.ConfigurarRota("/api/v2/documentos/10/anexos", () =>
                RespostaJson(new[]
                {
                    new { Id = 1, Nome = "planta.dwg", Tamanho = 102400 },
                    new { Id = 2, Nome = "relatorio.pdf", Tamanho = 20480 },
                    new { Id = 3, Nome = "fachada.dwg", Tamanho = 204800 }
                }));

            handler.ConfigurarRota("/api/v2/anexos/1/path", () =>
                RespostaJson(new { Id = 1, Nome = "planta.dwg", CaminhoUrl = "http://storage/planta.dwg" }));

            handler.ConfigurarRota("/api/v2/anexos/3/path", () =>
                RespostaJson(new { Id = 3, Nome = "fachada.dwg", CaminhoUrl = "http://storage/fachada.dwg" }));

            var servico = CriarServico(handler);

            // Act
            var resultado = await servico.ObterArquivosAsync(CriarPayload());

            // Assert
            Assert.Equal(2, resultado.Count);
            Assert.All(resultado, a => Assert.EndsWith(".dwg", a.Nome, StringComparison.OrdinalIgnoreCase));
            Assert.DoesNotContain(resultado, a => a.Nome == "relatorio.pdf");
        }

        [Fact]
        public async Task ObterArquivosAsync_ECMRetornaErro_LancaProxyException()
        {
            // Arrange
            var handler = new MockHttpMessageHandler();

            handler.ConfigurarRota("/api/v2/documentos/10/anexos", () =>
                new HttpResponseMessage(HttpStatusCode.ServiceUnavailable));

            var servico = CriarServico(handler);

            // Act & Assert
            await Assert.ThrowsAsync<ProxyException>(() =>
                servico.ObterArquivosAsync(CriarPayload()));
        }

        [Fact]
        public async Task ObterStreamsArquivoAsync_ArquivoExiste_RetornaProxyResult()
        {
            // Arrange
            var bytesArquivo = "conteudo-binario-simulado"u8.ToArray();
            var handler = new MockHttpMessageHandler();

            handler.ConfigurarRota("/api/v2/documentos/10/anexos", () =>
                RespostaJson(new[]
                {
                    new { Id = 5, Nome = "projeto.dwg", Tamanho = 512000 }
                }));

            handler.ConfigurarRota("/api/v2/anexos/5/path", () =>
                RespostaJson(new { Id = 5, Nome = "projeto.dwg", CaminhoUrl = "http://ecm-fake/storage/projeto.dwg" }));

            handler.ConfigurarRota("/storage/projeto.dwg", () =>
            {
                var resposta = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(bytesArquivo)
                };
                resposta.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                return resposta;
            });

            var servico = CriarServico(handler);

            // Act
            var resultado = await servico.ObterStreamsArquivoAsync(CriarPayload(), 5);

            // Assert
            Assert.NotNull(resultado);
            Assert.Equal("application/octet-stream", resultado.ContentType);
            Assert.Contains("projeto.dwg", resultado.NomeArquivo);
        }

        [Fact]
        public async Task ObterStreamsArquivoAsync_IdNaoEncontrado_LancaFileNotFoundException()
        {
            // Arrange
            var handler = new MockHttpMessageHandler();

            handler.ConfigurarRota("/api/v2/documentos/10/anexos", () =>
                RespostaJson(new[]
                {
                    new { Id = 5, Nome = "projeto.dwg", Tamanho = 512000 }
                }));

            handler.ConfigurarRota("/api/v2/anexos/5/path", () =>
                RespostaJson(new { Id = 5, Nome = "projeto.dwg", CaminhoUrl = "http://ecm-fake/storage/projeto.dwg" }));

            var servico = CriarServico(handler);

            // Act & Assert — id 99 não existe na lista
            await Assert.ThrowsAsync<FileNotFoundException>(() =>
                servico.ObterStreamsArquivoAsync(CriarPayload(), 99));
        }

        private static HttpResponseMessage RespostaJson(object corpo) =>
            new(HttpStatusCode.OK) { Content = JsonContent.Create(corpo) };
    }
}
