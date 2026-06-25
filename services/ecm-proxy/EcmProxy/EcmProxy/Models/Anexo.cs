using System.Text.Json.Serialization;

namespace EcmProxy.Models
{
    public class Anexo
    {
        public int Id { get; set; }
        
        public string Nome{ get; set; } = string.Empty;
        
        public long Tamanho{ get; set; }
        
        [JsonIgnore]
        public string CaminhoUrl { get; set; } = string.Empty;
    }
}
