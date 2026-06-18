const SUFIXOS_PERMITIDOS = [
  '.silodev.com.br',
  '.notpaper.com.br',
  '.silodev',
  '.notpaper'
];

// Verifica se o domínio é permitido
function dominioAutorizado(nomeHost: string): boolean {
    const hostMinusculo = nomeHost.toLocaleLowerCase();

    return SUFIXOS_PERMITIDOS.some(sufixo => 
        hostMinusculo.endsWith(sufixo) ||
        hostMinusculo === sufixo.replace(/^\./, '')
    );
}

// Valida se a origem da API é permitida
export function origemApiValida(urlOrigem: string) : boolean {
    if(!urlOrigem) return false;

    try {
        const nomeHost = new URL(urlOrigem).hostname;
        return dominioAutorizado(nomeHost);
    } catch (error) {
        console.error('Erro ao validar origem da API:', error);
        return false;
    }
}

// Valida se o referrer (origem onde a requisição partiu) é válido
export function referrerValido(referrer: string): boolean {
  if (!referrer) {
    // Permite que o referrer venha em branco caso o navegador tenha bloqueado
    return true;
  }
  try {
    const nomeHost = new URL(referrer).hostname;
    return dominioAutorizado(nomeHost);
  } catch (erro) {
    console.error('Erro ao analisar Referrer:', erro);
    return false;
  }
}