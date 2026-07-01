using EcmProxy.Configurations;
using EcmProxy.Exceptions;
using EcmProxy.Models;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace EcmProxy.Services
{
    public class TokenService : ITokenService
    {
        private readonly TokenOptions _options;

        public TokenService(IOptions<TokenOptions> options)
        {
            _options = options.Value;
        }

        public TokenPayload Descriptografar(string tokenCriptografado)
        {
            byte[] bytesCriptografados;
            try
            {
                bytesCriptografados = Convert.FromBase64String(tokenCriptografado);
            }
            catch(FormatException ex)
            {
                throw new TokenInvalidException(ex);
            }

            string json;
            try
            {
                json = DescriptografarAes(bytesCriptografados);
            }
            catch(CryptographicException ex)
            {
                throw new TokenInvalidException(ex);
            }

            TokenPayload payload;
            try
            {
                payload = JsonSerializer.Deserialize<TokenPayload>(json, _opcoesJson)
                 ?? throw new TokenMalformedException(new InvalidOperationException("Deserialization returnou null."));
            }
            catch(JsonException ex)
            {
                throw new TokenMalformedException(ex);
            }

            var expiracao = payload.TempoExpiracao.AddSeconds(_options.ClockSkewSegundos);
            if (expiracao < DateTime.Now)
            {
                throw new TokenExpiredException(payload.TempoExpiracao);
            }

            return payload;
        }

        private static readonly JsonSerializerOptions _opcoesJson = new()
        {
            PropertyNameCaseInsensitive = true,
            NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString
        };

        private string DescriptografarAes(byte[] bytesCriptografados)
        {
            var keyBytes = new Rfc2898DeriveBytes(
            _options.ChaveAes,
            Encoding.UTF8.GetBytes(_options.ChaveSalt),
            _options.Iteracao,
            HashAlgorithmName.SHA1
            ).GetBytes(16);

            using var aes = Aes.Create();
            aes.Key = keyBytes;
            aes.IV = Encoding.UTF8.GetBytes(_options.ChaveSalt);
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            using var decryptor = aes.CreateDecryptor();
            using var ms = new MemoryStream(bytesCriptografados);
            using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
            using var sr = new StreamReader(cs, Encoding.UTF8);
            return sr.ReadToEnd();
        }

    }
}
