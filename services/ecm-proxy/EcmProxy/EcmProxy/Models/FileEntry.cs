using System.Text.Json.Serialization;

namespace EcmProxy.Models
{
    public class FileEntry
    {
        public int FileId { get; set; }
        
        public string FileName { get; set; } = string.Empty;
        
        public long FileSize { get; set; }
        
        [JsonIgnore]
        public string UrlPath { get; set; } = string.Empty;
    }
}
