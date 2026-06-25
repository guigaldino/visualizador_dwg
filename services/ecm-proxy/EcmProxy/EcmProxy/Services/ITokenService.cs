using EcmProxy.Models;

namespace EcmProxy.Services
{
    public interface ITokenService
    {
        TokenPayload Descriptografar(string tokenCriptografado);
    }
}
