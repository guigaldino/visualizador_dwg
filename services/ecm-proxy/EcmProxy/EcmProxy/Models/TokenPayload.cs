namespace EcmProxy.Models
{
    public class TokenPayload
    {
        public int IdDocumento { get; set; }
        public string TokenSistema { get; set; } = string.Empty;
        public string UrlOrigem { get; set; } = string.Empty;
        public string IdUsuario {  get; set; } = string.Empty;
        public DateTime TempoExpiracao { get; set; }
    }
}
