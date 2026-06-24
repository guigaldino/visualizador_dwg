namespace EcmProxy.Models
{
    public class ProxyResult
    {
        public Stream Content { get; set; } = Stream.Null;
        public string ContentType { get; set; } = string.Empty;
        public string? ContentDisposition { get; set; }
    }
}
