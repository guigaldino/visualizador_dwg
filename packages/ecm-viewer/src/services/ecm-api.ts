import { de } from "element-plus/es/locale/index.mjs";

export interface AnexoEcm {
  id: string;
  nomeInterno: string;
  nomeOriginal: string;
  tamanho: string;
}

/**
 * Consome a lista de anexos associada ao documento do ECM
 */
export async function obterAnexos(urlOrigem: string, tokenSistema: string, documentoId: string): Promise<AnexoEcm[]> {
  debugger;
  const resposta = await fetch(`${urlOrigem}/api/v2/documentos/${documentoId}/anexos`, {
    headers: {
      'Authorization': `Bearer ${tokenSistema}`,
      'Accept': 'application/json'
    }
  });

  if (!resposta.ok) {
    throw new Error(`Falha ao obter anexos: ${resposta.statusText}`);
  }

  return resposta.json();
}

