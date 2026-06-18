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

router.beforeEach((to, from, next) => {
  debugger
  const storeEcm = usarStoreEcm()
  const tokenQuery = to.query.t as string | undefined // Lê parâmetro '?t='

  if (tokenQuery) {
    if (tokenJaProcessado(tokenQuery)) {
      next({ path: '/', query: {} }) // Limpa query string do navegador
      return
    }

    const payload = descriptografarToken(tokenQuery)
    if (!payload) {
      next({
        name: 'erro',
        query: {
          titulo: 'Token Inválido',
          mensagem: 'Não foi possível ler as credenciais do token.'
        }
      })
      return
    }

    if (estaExpirado(payload.TempoExpiracao)) {
      next({
        name: 'erro',
        query: {
          titulo: 'Token Expirado',
          mensagem: `O link de acesso expirou em ${new Date(payload.TempoExpiracao).toLocaleString()}.`
        }
      })
      return
    }

    if (!origemApiValida(payload.urlOrigem)) {
      next({
        name: 'erro',
        query: {
          titulo: 'Domínio Não Autorizado',
          mensagem: 'A URL de API contida no token não é confiável.'
        }
      })
      return
    }

    if (!referrerValido(document.referrer)) {
      next({
        name: 'erro',
        query: {
          titulo: 'Referrer Não Autorizado',
          mensagem: 'A origem de navegação não é permitida.'
        }
      })
      return
    }

    // Salva na store global do Pinia
    storeEcm.definirContexto(payload)
    setTokenComoProcessado(tokenQuery)

    next({ path: '/', query: {} }) // Redireciona limpando a query do navegador
    return
  }

  if (to.name === 'erro') {
    next()
    return
  }

  // Se o usuário não tem contexto ativo na store, impede de ver o visualizador
  if (!storeEcm.estaAutenticado) {
    next({
      name: 'erro',
      query: {
        titulo: 'Autenticação Requerida',
        mensagem: 'É necessário um token ativo para visualizar os documentos.'
      }
    })
    return
  }

  next()
})
