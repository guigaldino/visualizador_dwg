using EcmProxy.Configurations;
using EcmProxy.Exceptions;
using EcmProxy.Models;
using EcmProxy.Services;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using EcmProxyTests.Helpers;

namespace EcmProxyTests.Unit
{
    public class TokenServiceTests
    {

        // Arrange  → preparar os dados e configurar os objetos
        // Act      → executar o método que está sendo testado
        // Assert   → verificar se o resultado foi o esperado

        private readonly TokenOptions _opcoesPadrao = new()
        {
            ChaveAes = TokenTestHelper.ChaveAes,
            ChaveSalt = TokenTestHelper.ChaveSalt,
            Iteracao = TokenTestHelper.Iteracoes,
            ClockSkewSegundos = 0
        };

        private TokenService CriarServico(TokenOptions? opcoes = null)
        {
            var opts = Options.Create(opcoes ?? _opcoesPadrao);
            return new TokenService(opts);
        }

        [Fact]
        public void Descriptografar_TokenValido_RetornaPayloadCorreto()
        {
            // Arrange
            var payloadEsperado = new TokenPayload
            {
                IdDocumento = 42,
                TokenSistema = "bearer-ecm-123",
                UrlOrigem = "https://ecm.exemplo.com",
                IdUsuario = "usuario-01",
                TempoExpiracao = DateTime.Now.AddHours(1)
            };

            var token = TokenTestHelper.CriptografarToken(payloadEsperado);
            var servico = CriarServico();

            // Act
            var resultado = servico.Descriptografar(token);

            // Assert
            Assert.Equal(payloadEsperado.IdDocumento, resultado.IdDocumento);
            Assert.Equal(payloadEsperado.TokenSistema, resultado.TokenSistema);
            Assert.Equal(payloadEsperado.UrlOrigem, resultado.UrlOrigem);
            Assert.Equal(payloadEsperado.IdUsuario, resultado.IdUsuario);
        }

        [Fact]
        public void Descriptografar_TokenExpirado_LancaTokenExpiredException()
        {
            // Arrange
            var payloadExpirado = new TokenPayload
            {
                IdDocumento = 1,
                TempoExpiracao = DateTime.Now.AddHours(-1)
            };

            var token = TokenTestHelper.CriptografarToken(payloadExpirado);
            var servico = CriarServico();

            // Act & Assert
            Assert.Throws<TokenExpiredException>(() => servico.Descriptografar(token));
        }

        [Fact]
        public void Descriptografar_Base64Invalido_LancaTokenInvalidException()
        {
            // Arrange
            var servico = CriarServico();

            // Act & Assert
            Assert.Throws<TokenInvalidException>(() => servico.Descriptografar("isso-nao-e-base64-!!@@##"));
        }

        [Fact]
        public void Descriptografar_BytesCorretos_ChaveErrada_LancaTokenInvalidException()
        {
            // Arrange
            var payload = new TokenPayload { IdDocumento = 1, TempoExpiracao = DateTime.Now.AddHours(1) };
            var token = TokenTestHelper.CriptografarToken(payload);

            var opcoesChaveErrada = new TokenOptions
            {
                ChaveAes = "chave-DIFERENTE-999",
                ChaveSalt = "salt-DIFERENTE-999",
                Iteracao = 1000,
                ClockSkewSegundos = 0
            };

            var servico = CriarServico(opcoesChaveErrada);

            // Act & Assert
            Assert.Throws<TokenInvalidException>(() => servico.Descriptografar(token));
        }

        [Fact]
        public void Descriptografar_JsonInvalido_LancaTokenMalformedException()
        {
            // Arrange — criptografar texto que não é JSON
            var keyBytes = new Rfc2898DeriveBytes(
                _opcoesPadrao.ChaveAes,
                Encoding.UTF8.GetBytes(_opcoesPadrao.ChaveSalt),
                _opcoesPadrao.Iteracao,
                HashAlgorithmName.SHA1
            ).GetBytes(16);

            using var aes = Aes.Create();
            aes.Key = keyBytes;
            aes.IV = Encoding.UTF8.GetBytes(_opcoesPadrao.ChaveSalt);
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            using var encriptador = aes.CreateEncryptor();
            using var ms = new MemoryStream();
            using var cs = new CryptoStream(ms, encriptador, CryptoStreamMode.Write);
            using var sw = new StreamWriter(cs, Encoding.UTF8);
            sw.Write("isso nao e json { invalido }}}");
            sw.Flush();
            cs.FlushFinalBlock();

            var token = Convert.ToBase64String(ms.ToArray());
            var servico = CriarServico();

            // Act & Assert
            Assert.Throws<TokenMalformedException>(() => servico.Descriptografar(token));
        }
    }
}