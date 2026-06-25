namespace EcmProxy.Configurations
{
    public class ProxyOptions
    {
        public const string Section = "Proxy";

        public int TimeoutSeconds { get; set; } = 30;
        public int BuffertSizeBytes { get; set; } = 81920;
        public List<string> AllowedExtensions { get; set; } = [".dwg"];
    }
}
