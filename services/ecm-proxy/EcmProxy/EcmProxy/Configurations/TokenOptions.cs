namespace EcmProxy.Configurations
{
    public class TokenOptions
    {
        public const string Section = "Token";

        public string AesKey { get; set; } = string.Empty;
        public string SaltKey { get; set; } = string.Empty;
        public int Iteration { get; set; } = 1000;
        public int ClockSkewSeconds { get; set; } = 60;
    }
}
