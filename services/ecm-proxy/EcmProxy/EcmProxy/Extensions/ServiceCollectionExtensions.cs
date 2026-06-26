using EcmProxy.Configurations;
using EcmProxy.Services;
using Polly;
using Polly.Extensions.Http;

namespace EcmProxy.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AdicionarServicosProxy( this IServiceCollection services, IConfiguration configuracao )
        {
            services.Configure<TokenOptions>(
                    configuracao.GetSection(TokenOptions.Section));


            services.Configure<ProxyOptions>(
                configuracao.GetSection(ProxyOptions.Section));

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IFileProxyService, FileProxyService>();

            services.AddHttpClient("EcmClient")
                .AddPolicyHandler(ObterPoliticaRetentiva());

            return services;
        }

        private static IAsyncPolicy<HttpResponseMessage> ObterPoliticaRetentiva() => 
            HttpPolicyExtensions
                .HandleTransientHttpError()
                .WaitAndRetryAsync(
                    retryCount: 3,
                    sleepDurationProvider: tentativa => TimeSpan.FromSeconds(Math.Pow(2, tentativa))
                );
    }
}
