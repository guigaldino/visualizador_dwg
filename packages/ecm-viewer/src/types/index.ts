export interface DwgFile {
  id: string
  name: string
  filename: string
  url: string
  size?: string
  description?: string
}

declare global {
  interface Window {
    DOC_VERSAO_ID?: string
  }
}
