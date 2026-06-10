<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="app-header__brand">
        <div class="app-header__icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5" />
            <path d="M7 8h10M7 12h6M7 16h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M15 14l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
        <div class="app-header__title-group">
          <span class="app-header__title">Visualizador de Documentos DWG</span>
        </div>
      </div>

      <div class="app-header__right">
        <div v-if="isValid" class="app-header__badge">
          <span class="app-header__badge-label">Versão</span>
          <span class="app-header__badge-value">{{ docVersaoId }}</span>
        </div>
        
        <div class="app-header__readonly-tag">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a5 5 0 0 1 5 5v1h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 1 5-5zm0 1.5A3.5 3.5 0 0 0 4.5 6v1h7V6A3.5 3.5 0 0 0 8 2.5zM8 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
          </svg>
          Somente leitura
        </div>

      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDocVersaoId } from '../composables/useDocVersaoId'

const { docVersaoId, isValid } = useDocVersaoId()
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #217ebd 0%, #38b2d8 55%, #42bde3 100%);
  height: 60px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  animation: fadeInDown 0.5s ease-out both;
}

.app-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-header__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  flex-shrink: 0;
}

.app-header__title-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.app-header__title {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.2px;
  line-height: 1.2;
}

.app-header__subtitle {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.app-header__right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-header__badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

.app-header__badge-label {
  font-size: 10px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.app-header__badge-value {
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-header__readonly-tag {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  background: rgba(66, 189, 227, 0.2);
  border: 1px solid rgba(66, 189, 227, 0.35);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.2px;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
