import { computed, ref } from 'vue'

function decodeParam(raw: string): string {
  try {
    return atob(raw)
  } catch {
    return raw
  }
}

function resolveDocVersaoId(): string {
  const params = new URLSearchParams(window.location.search)
  const encoded = params.get('d')
  if (encoded) {
    return decodeParam(encoded)
  }
  return window.DOC_VERSAO_ID ?? ''
}

export function useDocVersaoId() {
  const docVersaoId = ref(resolveDocVersaoId())
  const isValid = computed(() => docVersaoId.value.length > 0)

  return { docVersaoId, isValid }
}
