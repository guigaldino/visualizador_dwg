using System.Text.Json.Serialization;

namespace EcmProxy.Models
{
    public class TokenPayload
    {
        [JsonPropertyName("DocumentoId")]
        public int IdDocumento { get; set; }

        [JsonPropertyName("tokenSistema")]
        public string TokenSistema { get; set; } = string.Empty;

        [JsonPropertyName("urlOrigem")]
        public string UrlOrigem { get; set; } = string.Empty;

        [JsonPropertyName("UserId")]
        public string IdUsuario { get; set; } = string.Empty;

        public DateTime TempoExpiracao { get; set; }
    }
}
