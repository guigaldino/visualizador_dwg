namespace EcmProxy.Exceptions
{
    public class ProxyException : Exception
    {
        public int CodigoStatus { get; }
        public int IdArquivo { get; }

        public ProxyException(int codigoStatus, int idArquivo)
        : base($"ECM retornou {codigoStatus} ao buscar o arquivo {idArquivo}.")
        {
            CodigoStatus = codigoStatus;
            IdArquivo = idArquivo;
        }
    }
}
