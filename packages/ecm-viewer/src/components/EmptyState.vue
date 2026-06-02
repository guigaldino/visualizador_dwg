<template>
  <div class="empty-state">
    <div class="empty-state__icon-wrap">
      <svg class="empty-state__icon" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <rect x="8" y="4" width="48" height="60" rx="5" fill="#e8f4f8" stroke="#b0d8e8" stroke-width="1.5"/>
        <rect x="14" y="4" width="48" height="60" rx="5" fill="#dde6f0" stroke="#a8cad8" stroke-width="1.5"/>
        <rect x="20" y="4" width="48" height="60" rx="5" fill="#f0f7fb" stroke="#38b2d8" stroke-width="1.5"/>
        <line x1="30" y1="22" x2="58" y2="22" stroke="#b0d8e8" stroke-width="2" stroke-linecap="round"/>
        <line x1="30" y1="30" x2="58" y2="30" stroke="#b0d8e8" stroke-width="2" stroke-linecap="round"/>
        <line x1="30" y1="38" x2="50" y2="38" stroke="#b0d8e8" stroke-width="2" stroke-linecap="round"/>
        <circle cx="59" cy="55" r="14" fill="#1a6fad" opacity="0.12"/>
        <circle cx="59" cy="55" r="10" fill="url(#grad-search)" />
        <line x1="67" y1="63" x2="72" y2="68" stroke="#1a6fad" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="59" cy="55" r="5" stroke="white" stroke-width="2" fill="none"/>
        <defs>
          <linearGradient id="grad-search" x1="49" y1="45" x2="69" y2="65" gradientUnits="userSpaceOnUse">
            <stop stop-color="#38b2d8"/>
            <stop offset="1" stop-color="#1a6fad"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div class="empty-state__content">
      <h2 class="empty-state__title">Nenhum arquivo selecionado</h2>
      <p class="empty-state__text">
        Selecione um arquivo DWG na lista ao lado para visualizá-lo neste painel.
      </p>
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
  padding: 40px;
  background: #f0f4f8;
}

.empty-state__icon-wrap {
  animation: floatIcon 3s ease-in-out infinite;
  opacity: 0.8;
}

.empty-state__icon {
  width: 88px;
  height: 88px;
  filter: drop-shadow(0 8px 20px rgba(26, 111, 173, 0.15));
}

.empty-state__content {
  text-align: center;
  max-width: 300px;
}

.empty-state__title {
  font-size: 17px;
  font-weight: 700;
  color: #1d2b3d;
  margin-bottom: 8px;
}

.empty-state__text {
  font-size: 13px;
  font-weight: 400;
  color: #5a6b7f;
  line-height: 1.6;
}

@keyframes floatIcon {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}
</style>
