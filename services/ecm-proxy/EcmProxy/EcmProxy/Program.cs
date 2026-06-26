using EcmProxy.Extensions;
using EcmProxy.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Serviços
builder.Services.AdicionarServicosProxy(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opcoes =>
{
    var origensPermitidas = builder.Configuration
        .GetSection("Cors:OrigensPermitidas")
        .Get<string[]>() ?? [];

    opcoes.AddDefaultPolicy(politica =>
        politica
            .WithOrigins(origensPermitidas)
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<RequestLoggingMiddleware>();
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseCors();
app.MapControllers();

app.Run();

public partial class Program { }
