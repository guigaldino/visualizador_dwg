<template>
  <div class="ecm-page">
    <AppHeader />

    <div class="ecm-main">
      <FileSelector
        class="ecm-sidebar"
        :files="dwgFiles"
        @select="onFileSelect"
      />

      <div class="ecm-viewer-pane">
        <Transition name="fade">
          <div v-if="isLoading" class="ecm-loading-overlay">
            <div class="ecm-loading-card">
              <div class="ecm-loading-spinner" />
              <span class="ecm-loading-text">Carregando arquivo...</span>
            </div>
          </div>
        </Transition>

        <EmptyState v-if="!viewerFile && !isLoading" />

        <MlCadViewer
          v-if="viewerFile"
          :key="viewerKey"
          locale="pt"
          :local-file="viewerFile"
          :mode="openMode"
          base-url="https://cdn.jsdelivr.net/gh/mlightcad/cad-data@main/"
          class="ecm-cad-viewer"
          @create="onViewerCreate"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AcEdOpenMode } from '@mlightcad/cad-simple-viewer'
import { MlCadViewer } from '@mlightcad/cad-viewer'
import { ref } from 'vue'

import AppHeader from '../components/AppHeader.vue'
import EmptyState from '../components/EmptyState.vue'
import FileSelector from '../components/FileSelector.vue'
import type { DwgFile } from '../types'

const openMode = AcEdOpenMode.Read

const dwgFiles: DwgFile[] = [
  {
    id: '1',
    name: 'Anotações Arquiteturais',
    filename: 'architectural-annotations.dwg',
    url: './mock/architectural-annotations.dwg',
    size: '180 KB'
  },
  {
    id: '2',
    name: 'Projeto Welligton – Varanda',
    filename: 'projeto-welligton-varanda.dwg',
    url: './mock/projeto-welligton-varanda.dwg',
    size: '1.2 MB'
  }
]

const viewerFile = ref<File | null>(null)
const viewerKey = ref(0)
const isLoading = ref(false)

async function onFileSelect(file: DwgFile) {
  if (isLoading.value) return

  isLoading.value = true
  viewerFile.value = null

  try {
    const response = await fetch(file.url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const blob = await response.blob()
    viewerFile.value = new File([blob], file.filename, { type: 'application/octet-stream' })
    viewerKey.value += 1
  } catch (err) {
    console.error('Erro ao carregar arquivo DWG:', err)
  } finally {
    isLoading.value = false
  }
}

function onViewerCreate() {
  // Viewer initialized — built-in loading indicator handles the rest
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
