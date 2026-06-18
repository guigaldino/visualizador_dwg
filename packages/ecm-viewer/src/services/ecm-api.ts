export interface AnexoEcm {
  id: string;
  name: string;
  filename: string;
  size: string;
}

/**
 * Consome a lista de anexos associada ao documento do ECM
 */
export async function listarAnexos(urlOrigem: string, tokenSistema: string, documentoId: string): Promise<AnexoEcm[]> {
  const resposta = await fetch(`${urlOrigem}/docs/${documentoId}/attachments`, {
    headers: {
      'Authorization': `Bearer ${tokenSistema}`,
      'Accept': 'application/json'
    }
  });

  if (!resposta.ok) {
    throw new Error(`Falha ao carregar anexos: ${resposta.statusText}`);
  }

  return resposta.json();
}

/**
 * Baixa o anexo em formato binário bruto (ArrayBuffer)
 */
export async function baixarAnexo(urlOrigem: string, tokenSistema: string, anexoId: string): Promise<ArrayBuffer> {
  const resposta = await fetch(`${urlOrigem}/attachments/${anexoId}/download`, {
    headers: {
      'Authorization': `Bearer ${tokenSistema}`
    }
  });

  if (!resposta.ok) {
    throw new Error(`Falha ao baixar anexo: ${resposta.statusText}`);
  }

  return resposta.arrayBuffer();
}
