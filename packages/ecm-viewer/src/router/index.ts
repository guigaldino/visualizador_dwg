import { createRouter, createWebHashHistory } from 'vue-router'
import EcmViewerPage from '../pages/EcmViewerPage.vue'
import PaginaErroFallback from '../pages/PaginaErroFallback.vue'
import { usarStoreEcm } from '../store/ecm'
import {
  descriptografarToken,
  estaExpirado,
  tokenJaProcessado,
  setTokenComoProcessado
} from '../utils/token'
import { origemApiValida, referrerValido } from './guards'

const rotas = [
  {
    path: '/',
    name: 'visualizador',
    component: EcmViewerPage
  },
  {
    path: '/erro',
    name: 'erro',
    component: PaginaErroFallback,
    props: (rota: any) => ({
      titulo: rota.query.titulo || 'Acesso Restrito',
      mensagem:
        rota.query.mensagem || 'Token de autenticação inválido ou expirado.'
    })
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})

router.beforeEach((to, from) => {
  const storeEcm = usarStoreEcm()

  let tokenQuery = to.query.t as string | undefined

  if (!tokenQuery) {
    const params = new URLSearchParams(window.location.search)
    tokenQuery = params.get('t') || undefined
  }

  if (tokenQuery) {
    if (tokenJaProcessado(tokenQuery)) {
      if (window.location.search) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.hash
        )
      }
      return { path: '/', query: {} }
    }

    setTokenComoProcessado(tokenQuery)
    if (window.location.search) {
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname + window.location.hash
      )
    }

    const payload = descriptografarToken(tokenQuery)
    if (!payload) {
      return {
        name: 'erro',
        query: {
          titulo: 'Token Inválido',
          mensagem: 'Não foi possível ler as credenciais do token.'
        }
      }
    }

    if (estaExpirado(payload.TempoExpiracao)) {
      return {
        name: 'erro',
        query: {
          titulo: 'Token Expirado',
          mensagem: `O link de acesso expirou em ${new Date(payload.TempoExpiracao).toLocaleString()}.`
        }
      }
    }

    if (!origemApiValida(payload.urlOrigem)) {
      return {
        name: 'erro',
        query: {
          titulo: 'Domínio Não Autorizado',
          mensagem: 'A URL de API contida no token não é confiável.'
        }
      }
    }

    if (!referrerValido(document.referrer)) {
      return {
        name: 'erro',
        query: {
          titulo: 'Referrer Não Autorizado',
          mensagem: 'A origem de navegação não é permitida.'
        }
      }
    }

    storeEcm.definirContexto(payload)
  }

  if (to.name === 'erro') {
    return true
  }

  if (!storeEcm.estaAutenticado) {
    return {
      name: 'erro',
      query: {
        titulo: 'Autenticação Requerida',
        mensagem: 'É necessário um token ativo para visualizar os documentos.'
      }
    }
  }

  return true
})
