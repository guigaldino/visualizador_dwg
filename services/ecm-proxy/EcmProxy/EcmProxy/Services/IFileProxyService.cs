using EcmProxy.Models;

namespace EcmProxy.Services
{
    public interface IFileProxyService
    {
        Task<List<FileEntry>> ObterArquivosAsync(TokenPayload payload, CancellationToken cancellationToken = default);
        Task<ProxyResult> ObterFluxoArquivoAsync(TokenPayload payload, int idArquivo, CancellationToken cancellationToken = default);
    }
}
