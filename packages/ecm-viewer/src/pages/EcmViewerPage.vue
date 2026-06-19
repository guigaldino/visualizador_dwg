<template>
  <div class="ecm-page">
    <!-- Componente do Cabeçalho -->
    <AppHeader />

    <div class="ecm-main">
      <!-- 
        FileSelector: Barra lateral que lista os arquivos.
        - :files="arquivosDwg" passa a lista de arquivos retornada do GO.ECM.
        - @select="selecionarArquivo" escuta o clique em um arquivo e inicia o download.
      -->
      <FileSelector
        class="ecm-sidebar"
        :files="arquivosDwg"
        @select="selecionarArquivo"
      />

      <div class="ecm-viewer-pane">
        <!-- 
          Transição suave de carregamento.
          - v-if="carregando" só exibe esta tela se a variável "carregando" for true.
        -->
        <Transition name="fade">
          <div v-if="carregando" class="ecm-loading-overlay">
            <div class="ecm-loading-card">
              <div class="ecm-loading-spinner" />
              <span class="ecm-loading-text">Carregando arquivo...</span>
            </div>
          </div>
        </Transition>

        <!-- 
          EmptyState: Exibe imagem e texto informativo.
          - v-if="!arquivoVisualizador && !carregando" só exibe se não houver 
            arquivo selecionado E se não estiver carregando nada no momento.
        -->
        <EmptyState v-if="!arquivoVisualizador && !carregando" />

        <!-- 
          MlCadViewer: Visualizador do DWG.
          - v-if="arquivoVisualizador" só cria o visualizador se houver um arquivo pronto.
          - :key="chaveVisualizador" força o Vue a recriar o visualizador do zero toda vez 
            que o valor mudar (incrementamos +1 ao baixar um novo arquivo).
          - :local-file="arquivoVisualizador" passa o arquivo baixado em memória.
          - @create="aoCriarVisualizador" chama a função após o visualizador inicializar.
        -->
        <MlCadViewer
          v-if="arquivoVisualizador"
          :key="chaveVisualizador"
          locale="pt"
          :local-file="arquivoVisualizador"
          :mode="openMode"
          base-url="https://cdn.jsdelivr.net/gh/mlightcad/cad-data@main/"
          class="ecm-cad-viewer"
          @create="aoCriarVisualizador"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AcEdOpenMode } from '@mlightcad/cad-simple-viewer'
import { MlCadViewer } from '@mlightcad/cad-viewer'
import { ref, onMounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import EmptyState from '../components/EmptyState.vue'
import FileSelector from '../components/FileSelector.vue'
import { usarStoreEcm } from '../store/ecm'
import { obterAnexos } from '../services/ecm-api'
import type { DwgFile } from '../types'

const openMode = AcEdOpenMode.Read
const storeEcm = usarStoreEcm()
const arquivosDwg = ref<DwgFile[]>([])
const arquivoVisualizador = ref<File | null>(null)
const chaveVisualizador = ref(0)
const carregando = ref(false)

onMounted(async () => {
  if (!storeEcm.estaAutenticado) return
  
  carregando.value = true
  try {
    debugger
    arquivosDwg.value = await obterAnexosDwg()
  } catch (erro) {
    console.error('Falha ao carregar anexos:', erro)
  } finally {
    carregando.value = false
  }
})

function formatarTamanho(tamanhoBytes: string | number): string {
  const bytes = typeof tamanhoBytes === 'string' ? parseInt(tamanhoBytes, 10) : tamanhoBytes
  if (isNaN(bytes) || bytes <= 0) return '0 B'
  const unidades = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${unidades[i]}`
}

async function obterAnexosDwg(): Promise<DwgFile[]> {
  const anexos = await obterAnexos(storeEcm.urlOrigem!, storeEcm.tokenSistema!, storeEcm.documentoId!)
  return anexos
    .filter(anexo => anexo.nomeInterno.toUpperCase().includes('DWG'))
    .map(anexo => ({
      id: anexo.id,
      name: anexo.nomeOriginal,
      filename: anexo.nomeInterno,
      size: formatarTamanho(anexo.tamanho),
      url: '' // Opcional, usado apenas pelo tipo genérico do componente
    }))
}

function selecionarArquivo(arquivo: DwgFile) {
  alert(`Anexo selecionado:\nNome: ${arquivo.name}\nID: ${arquivo.id}\nTamanho: ${arquivo.size || 'Desconhecido'}`)
}

function aoCriarVisualizador() {
  // Inicialização concluída
}
</script>

<style>
:root {
  --bg: #f0f4f8;
  --panel: #ffffff;
  --cor-principal: #38b2d8;
  --cor-secundaria: #1a6fad;
  --muted: #9fb8c6;
  --acoes-title: #1c2d3a;
  --thumb-bg: #eef9fb;

  --sp-azul-escuro: #245697;
  --sp-azul-medio: #337ab7;
  --sp-azul-claro: #42bde3;
  --sp-azul-profundo: #052b6e;
  --sp-azul-sidebar-hover: #1b447a;
  --sp-texto-primario: #1d2b3d;
  --sp-texto-secundario: #5a6b7f;
  --sp-texto-terciario: #8896a7;
  --sp-fundo-pagina: #eaf1f8;
  --sp-fundo-cartao: #ffffff;

  --shadow: 0 4px 24px rgba(18, 50, 64, 0.07);
  --shadow-elevated: 0 8px 32px rgba(18, 50, 64, 0.12);
  --shadow-btn: 0 4px 14px rgba(26, 111, 173, 0.2);
  --shadow-btn-hover: 0 6px 20px rgba(26, 111, 173, 0.3);
  --surface-glass: rgba(255, 255, 255, 0.72);
  --surface-glass-border: rgba(255, 255, 255, 0.45);
  --surface-hover: #edf6fa;
  --surface-input: #f7fbfd;
  --surface-input-border: #dce9f0;

  --radius: 14px;
  --radius-sm: 8px;
  --radius-pill: 999px;

  --transition-fast: 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  --principal-background-cor: linear-gradient(135deg, #1a6fad, #38b2d8);
  --sp-gradiente-principal: linear-gradient(135deg, #217ebd, #42bde3);
  --sp-gradiente-header: linear-gradient(135deg, #1b447a 0%, #245697 50%, #337ab7 100%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

<style scoped>
.ecm-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: var(--bg);
  font-family: 'Inter', 'Segoe UI', Roboto, Arial, sans-serif;
  overflow: hidden;
}

.ecm-main {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.ecm-sidebar {
  width: 272px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ecm-viewer-pane {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: var(--bg);
  transform: translateZ(0);
}

.ecm-cad-viewer {
  width: 100%;
  height: 100%;
}

/* Loading overlay */
.ecm-loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(240, 244, 248, 0.75);
  backdrop-filter: blur(6px);
  z-index: 10;
}

.ecm-loading-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 28px 36px;
  background: var(--surface-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--surface-glass-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-elevated);
}

.ecm-loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(56, 178, 216, 0.2);
  border-top-color: var(--cor-principal);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.ecm-loading-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--sp-texto-secundario);
  letter-spacing: 0.1px;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-base);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
