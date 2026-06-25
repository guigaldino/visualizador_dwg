namespace EcmProxy.Configurations
{
    public class ProxyOptions
    {
        public const string Section = "Proxy";

        public int TimeoutSegundos { get; set; } = 30;
        public int TamanhoBufferBytes { get; set; } = 81920;
        public List<string> ExtensoesPermitidas { get; set; } = [".dwg"];
    }
}
