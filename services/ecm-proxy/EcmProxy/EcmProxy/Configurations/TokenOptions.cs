namespace EcmProxy.Configurations
{
    public class TokenOptions
    {
        public const string Section = "Token";

        public string ChaveAes { get; set; } = string.Empty;
        public string ChaveSalt { get; set; } = string.Empty;
        public int Iteracao { get; set; } = 1000;
        public int ClockSkewSegundos { get; set; } = 60;
    }
}
