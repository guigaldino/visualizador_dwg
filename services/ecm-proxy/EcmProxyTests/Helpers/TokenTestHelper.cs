using EcmProxy.Models;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace EcmProxyTests.Helpers
{
    internal static class TokenTestHelper
    {
        internal const string ChaveAes = "chave-teste-123";
        internal const string ChaveSalt = "salt-teste-456";
        internal const int Iteracoes = 1000;

        internal static string CriptografarToken(TokenPayload payload)
        {
            var json = JsonSerializer.Serialize(payload);

            var keyBytes = new Rfc2898DeriveBytes(
                ChaveAes,
                Encoding.UTF8.GetBytes(ChaveSalt),
                Iteracoes,
                HashAlgorithmName.SHA1
            ).GetBytes(16);

            using var aes = Aes.Create();
            aes.Key = keyBytes;
            aes.IV = keyBytes;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            using var encriptador = aes.CreateEncryptor();
            using var ms = new MemoryStream();
            using var cs = new CryptoStream(ms, encriptador, CryptoStreamMode.Write);
            using var sw = new StreamWriter(cs, Encoding.UTF8);
            sw.Write(json);
            sw.Flush();
            cs.FlushFinalBlock();

            return Convert.ToBase64String(ms.ToArray());
        }
    }
}