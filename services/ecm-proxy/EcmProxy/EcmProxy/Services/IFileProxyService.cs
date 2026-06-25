using EcmProxy.Models;

namespace EcmProxy.Services
{
    public interface IFileProxyService
    {
        Task<List<FileEntry>> GetFilesAsync(TokenPayload payload, CancellationToken cancellationToken = default);
        Task<ProxyResult> StreamFileAsync(TokenPayload payload, int fileId, CancellationToken cancellationToken = default);
    }
}
