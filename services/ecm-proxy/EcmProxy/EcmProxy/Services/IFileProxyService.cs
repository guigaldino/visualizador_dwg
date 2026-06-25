using EcmProxy.Models;

namespace EcmProxy.Services
{
    public interface IFileProxyService
    {
        Task<List<Anexo>> ObterArquivosAsync(TokenPayload payload, CancellationToken cancellationToken = default);
        Task<ProxyResult> ObterStreamsArquivoAsync(TokenPayload payload, int idArquivo, CancellationToken cancellationToken = default);
    }
}
