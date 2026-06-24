namespace EcmProxy.Exceptions
{
    public class ProxyException : Exception
    {
        public int StatusCode { get; }
        public int FileId { get; }

        public ProxyException(int statusCode, int fileId)
        : base($"ECM retornou {statusCode} ao buscar o arquivo {fileId}.")
        {
            StatusCode = statusCode;
            FileId = fileId;
        }
    }
}
