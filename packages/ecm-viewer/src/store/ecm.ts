import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DadosToken } from '../utils/token'

export const usarStoreEcm = defineStore('ecm', () => {
  const documentoId = ref<string | null>(null)
  const tokenSistema = ref<string | null>(null)
  const urlOrigem = ref<string | null>(null)
  const usuarioId = ref<string | null>(null)

  const estaAutenticado = computed(
    () => !!tokenSistema.value && !!documentoId.value && !!urlOrigem.value
  )

  function definirContexto(payload: DadosToken) {
    documentoId.value = payload.DocumentoId
    tokenSistema.value = payload.tokenSistema
    urlOrigem.value = payload.urlOrigem
    usuarioId.value = payload.UserId
  }

  function limparContexto() {
    documentoId.value = null
    tokenSistema.value = null
    urlOrigem.value = null
    usuarioId.value = null
  }

  return {
    documentoId,
    tokenSistema,
    urlOrigem,
    usuarioId,
    estaAutenticado,
    definirContexto,
    limparContexto
  }
})
