using System.Text.Json.Serialization;

namespace EcmProxy.Models
{
    public class FileEntry
    {
        public int IdArquivo { get; set; }
        
        public string NomeArquivo { get; set; } = string.Empty;
        
        public long TamanhoArquivo { get; set; }
        
        [JsonIgnore]
        public string CaminhoUrl { get; set; } = string.Empty;
    }
}
