namespace EcmProxy.Exceptions
{
    public class TokenException : Exception
    {
        public TokenException(string message) : base(message) { }
        public TokenException(string message, Exception innerException) : base(message, innerException) { }

        public class TokenExpiredException : TokenException
        {
            public DateTime ExpiradoAt { get; }

            public TokenExpiredException(DateTime expiredAt )
                : base($"Token expirado em: {expiredAt:u}.")
            {
                ExpiradoAt = expiredAt;
            }

        }

        public class TokenInvalidException : TokenException
        {
            public TokenInvalidException (Exception inner)
                :base($"Falha na descriptografia AES. Token corrompido ou chave incorreta.", inner) { }
        }

        public class TokenMalformedException : TokenException
        {
            public TokenMalformedException(Exception inner)
                : base("Token descriptografado com sucesso, mas o JSON interno é inválido.", inner) { }
        }

    }
}
