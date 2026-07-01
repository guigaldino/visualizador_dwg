using EcmProxy.Exceptions;
using EcmProxy.Models;
using EcmProxy.Services;
using EcmProxyTests.Helpers;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

namespace EcmProxyTests.Integration
{
    public class FileProxyControllerTests
    {
        private static readonly Dictionary<string, string?> _configuracaoTeste = new()
        {
            ["Token:ChaveAes"] = TokenTestHelper.ChaveAes,
            ["Token:ChaveSalt"] = TokenTestHelper.ChaveSalt,
            ["Token:Iteracao"] = TokenTestHelper.Iteracoes.ToString(),
            ["Token:ClockSkewSegundos"] = "60",
            ["Cors:OrigensPermitidas:0"] = "http://localhost"
        };

        private HttpClient CriarCliente(Mock<IFileProxyService> mockServico)
        {
            return new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureAppConfiguration((_, config) =>
                        config.AddInMemoryCollection(_configuracaoTeste));

                    builder.ConfigureTestServices(services =>
                        services.AddScoped<IFileProxyService>(_ => mockServico.Object));
                })
                .CreateClient();
        }

        private static TokenPayload CriarPayload(DateTime? expiracao = null) => new()
        {
            IdDocumento = 10,
            TokenSistema = "token-ecm-valido",
            UrlOrigem = "http://ecm-fake",
            IdUsuario = "usuario-01",
            TempoExpiracao = expiracao ?? DateTime.UtcNow.AddHours(1)
        };

        [Fact]
        public async Task ObterArquivos_TokenValido_Retorna200ComListaDwg()
        {
            // Arrange
            var mockServico = new Mock<IFileProxyService>();
            mockServico
                .Setup(s => s.ObterArquivosAsync(It.IsAny<TokenPayload>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(
                [
                    new Anexo { Id = 1, Nome = "planta.dwg", Tamanho = 102400, CaminhoUrl = "http://ecm/storage/planta.dwg" }
                ]);

            var token = TokenTestHelper.CriptografarToken(CriarPayload());
            var cliente = CriarCliente(mockServico);

            // Act
            var resposta = await cliente.GetAsync($"/api/proxy/files?token={Uri.EscapeDataString(token)}");
            var resultado = await resposta.Content.ReadFromJsonAsync<List<Anexo>>();

            // Assert
            Assert.Equal(HttpStatusCode.OK, resposta.StatusCode);
            Assert.NotNull(resultado);
            Assert.Single(resultado);
            Assert.Equal("planta.dwg", resultado[0].Nome);
        }

        [Fact]
        public async Task ObterArquivos_CaminhoUrlNaoDeveSerRetornado()
        {
            // Arrange — CaminhoUrl é preenchido internamente mas [JsonIgnore] impede a serialização
            var mockServico = new Mock<IFileProxyService>();
            mockServico
                .Setup(s => s.ObterArquivosAsync(It.IsAny<TokenPayload>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(
                [
                    new Anexo { Id = 1, Nome = "planta.dwg", Tamanho = 102400, CaminhoUrl = "http://ecm/storage/secreto.dwg" }
                ]);

            var token = TokenTestHelper.CriptografarToken(CriarPayload());
            var cliente = CriarCliente(mockServico);

            // Act
            var resposta = await cliente.GetAsync($"/api/proxy/files?token={Uri.EscapeDataString(token)}");

            Assert.Equal(HttpStatusCode.OK, resposta.StatusCode);

            var json = await resposta.Content.ReadAsStringAsync();
            var documento = JsonDocument.Parse(json);
            var primeiro = documento.RootElement[0];

            // Assert — o campo e a URL interna não podem vazar ao browser
            Assert.False(primeiro.TryGetProperty("caminhoUrl", out _));
            Assert.False(primeiro.TryGetProperty("CaminhoUrl", out _));
            Assert.DoesNotContain("secreto.dwg", json);
        }

        [Fact]
        public async Task ObterArquivos_TokenExpirado_Retorna401ComProblemDetails()
        {
            // Arrange
            var mockServico = new Mock<IFileProxyService>();
            var tokenExpirado = TokenTestHelper.CriptografarToken(
                CriarPayload(expiracao: DateTime.UtcNow.AddHours(-1)));
            var cliente = CriarCliente(mockServico);

            // Act
            var resposta = await cliente.GetAsync($"/api/proxy/files?token={Uri.EscapeDataString(tokenExpirado)}");

            // Assert
            Assert.Equal(HttpStatusCode.Unauthorized, resposta.StatusCode);
            Assert.Equal("application/problem+json", resposta.Content.Headers.ContentType?.MediaType);
        }

        [Fact]
        public async Task ObterArquivos_TokenInvalido_Retorna401()
        {
            // Arrange
            var mockServico = new Mock<IFileProxyService>();
            var cliente = CriarCliente(mockServico);

            // Act
            var resposta = await cliente.GetAsync("/api/proxy/files?token=isso-nao-e-base64-valido!!");

            // Assert
            Assert.Equal(HttpStatusCode.Unauthorized, resposta.StatusCode);
        }

        [Fact]
        public async Task ObterStreamArquivo_ArquivoExiste_Retorna200ComBytesEContentDisposition()
        {
            // Arrange
            var bytesEsperados = "bytes-do-arquivo-dwg"u8.ToArray();
            var mockServico = new Mock<IFileProxyService>();
            mockServico
                .Setup(s => s.ObterStreamsArquivoAsync(It.IsAny<TokenPayload>(), 5, It.IsAny<CancellationToken>()))
                .ReturnsAsync(new ProxyResult
                {
                    Content = new MemoryStream(bytesEsperados),
                    ContentType = "application/octet-stream",
                    NomeArquivo = "projeto.dwg"
                });

            var token = TokenTestHelper.CriptografarToken(CriarPayload());
            var cliente = CriarCliente(mockServico);

            // Act
            var resposta = await cliente.GetAsync($"/api/proxy/files/5/stream?token={Uri.EscapeDataString(token)}");
            var bytesRecebidos = await resposta.Content.ReadAsByteArrayAsync();

            // Assert
            Assert.Equal(HttpStatusCode.OK, resposta.StatusCode);
            Assert.Equal(bytesEsperados, bytesRecebidos);
            Assert.Contains("projeto.dwg", resposta.Content.Headers.ContentDisposition?.ToString() ?? string.Empty);
        }

        [Fact]
        public async Task ObterStreamArquivo_IdNaoEncontrado_Retorna404ComProblemDetails()
        {
            // Arrange
            var mockServico = new Mock<IFileProxyService>();
            mockServico
                .Setup(s => s.ObterStreamsArquivoAsync(It.IsAny<TokenPayload>(), 99, It.IsAny<CancellationToken>()))
                .ThrowsAsync(new FileNotFoundException("Arquivo 99 não encontrado."));

            var token = TokenTestHelper.CriptografarToken(CriarPayload());
            var cliente = CriarCliente(mockServico);

            // Act
            var resposta = await cliente.GetAsync($"/api/proxy/files/99/stream?token={Uri.EscapeDataString(token)}");

            // Assert
            Assert.Equal(HttpStatusCode.NotFound, resposta.StatusCode);
            Assert.Equal("application/problem+json", resposta.Content.Headers.ContentType?.MediaType);
        }

        [Fact]
        public async Task ObterStreamArquivo_ECMRetornaErro_Retorna502()
        {
            // Arrange
            var mockServico = new Mock<IFileProxyService>();
            mockServico
                .Setup(s => s.ObterStreamsArquivoAsync(It.IsAny<TokenPayload>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
                .ThrowsAsync(new ProxyException(503, 5));

            var token = TokenTestHelper.CriptografarToken(CriarPayload());
            var cliente = CriarCliente(mockServico);

            // Act
            var resposta = await cliente.GetAsync($"/api/proxy/files/5/stream?token={Uri.EscapeDataString(token)}");

            // Assert
            Assert.Equal(HttpStatusCode.BadGateway, resposta.StatusCode);
        }
    }
}
