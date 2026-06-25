namespace EcmProxy.Exceptions
{
    public class TokenException : Exception
    {
        public TokenException(string message) : base(message) { }
        public TokenException(string message, Exception innerException) : base(message, innerException) { }
    }

    public class TokenExpiredException : TokenException
    {
        public DateTime ExpiradoEm { get; }

        public TokenExpiredException(DateTime expiradoEm)
            : base($"Token expirado em: {expiradoEm:u}.")
        {
            ExpiradoEm = expiradoEm;
        }

    }

    public class TokenInvalidException : TokenException
    {
        public TokenInvalidException(Exception excecaoInterna)
            : base($"Falha na descriptografia AES. Token corrompido ou chave incorreta.", excecaoInterna) { }
    }

    public class TokenMalformedException : TokenException
    {
        public TokenMalformedException(Exception excecaoInterna)
            : base("Token descriptografado com sucesso, mas o JSON interno é inválido.", excecaoInterna) { }
    }
}
