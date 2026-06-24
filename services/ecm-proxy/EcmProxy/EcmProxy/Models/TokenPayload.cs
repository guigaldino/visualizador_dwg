namespace EcmProxy.Models
{
    public class TokenPayload
    {
        public int DocumentoId { get; set; }
        public string TokenSistema { get; set; } = string.Empty;
        public string UrlOrigem { get; set; } = string.Empty;
        public string UserId {  get; set; } = string.Empty;
        public DateTime TempoExpiracao { get; set; }
    }
}
