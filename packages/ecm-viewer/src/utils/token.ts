import CryptoJS from "crypto-js";

export interface DadosToken {
    DocumentoId: string,
    tokenSistema: string,
    urlOrigem: string,
    UserId: string,
    TempoExpiracao: string
};

const CHAVE_CRIPTO = import.meta.env.VITE_TOKEN_SECRET;

const SALT = CryptoJS.enc.Utf8.parse(CHAVE_CRIPTO);

function derivarChave(chave: string): { key: CryptoJS.lib.WordArray; iv: CryptoJS.lib.WordArray } {
  const key = CryptoJS.PBKDF2(chave, SALT, {
    keySize: 128 / 32,
    iterations: 1000,
    hasher: CryptoJS.algo.SHA1
  });
  return { key, iv: SALT };
}

export function descriptografarToken(tokenCriptografado: string): DadosToken | null {
  if (!tokenCriptografado || !CHAVE_CRIPTO) return null;
  try {
    const tokenDecodificado = decodeURIComponent(tokenCriptografado);
    const { key, iv } = derivarChave(CHAVE_CRIPTO);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(tokenDecodificado)
    });
    const bytes = CryptoJS.AES.decrypt(cipherParams, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const textoDescriptografado = bytes.toString(CryptoJS.enc.Utf8);
    if (!textoDescriptografado) return null;

    const json = JSON.parse(textoDescriptografado) as DadosToken;
    console.log(json);

    return json;
  } catch (erro) {
    console.error('Falha ao descriptografar o token:', erro);
    return null;
  }
}

export function estaExpirado(tempoExpiracao: string): boolean {
  try {
    const tempoLimite = Date.parse(tempoExpiracao);
    if (isNaN(tempoLimite)) return true;
    return Date.now() > tempoLimite;
  } catch (erro) {
    console.error('Falha ao analisar data de expiração:', erro);
    return true;
  }
}

export function tokenJaProcessado(token: string): boolean {
    return sessionStorage.getItem('token_ecm_processado') === token;
}

export function setTokenComoProcessado(token: string): void {
    sessionStorage.setItem('token_ecm_processado', token);
}