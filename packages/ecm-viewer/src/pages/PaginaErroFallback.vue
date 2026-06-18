<template>
  <div class="erro-fallback">
    <div class="cartao-erro">
      <div class="icone-erro">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9V14M12 17.01H12.01M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" 
                stroke="#d93838" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1 class="titulo-erro">{{ titulo }}</h1>
      <p class="mensagem-erro">{{ mensagem }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  titulo: string;
  mensagem: string;
}>();
</script>

<style scoped>
.erro-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: var(--bg, #f0f4f8);
  font-family: 'Inter', sans-serif;
}

.cartao-erro {
  text-align: center;
  background: var(--surface-glass, rgba(255, 255, 255, 0.72));
  backdrop-filter: blur(12px);
  border: 1px solid var(--surface-glass-border, rgba(255, 255, 255, 0.45));
  border-radius: var(--radius, 14px);
  padding: 40px;
  max-width: 450px;
  width: 90%;
  box-shadow: var(--shadow-elevated, 0 8px 32px rgba(18, 50, 64, 0.12));
}

.icone-erro {
  margin-bottom: 20px;
}

.icone-erro svg {
  width: 64px;
  height: 64px;
  filter: drop-shadow(0 4px 10px rgba(217, 56, 56, 0.15));
}

.titulo-erro {
  font-size: 20px;
  font-weight: 700;
  color: var(--sp-texto-primario, #1d2b3d);
  margin-bottom: 12px;
}

.mensagem-erro {
  font-size: 14px;
  line-height: 1.6;
  color: var(--sp-texto-secundario, #5a6b7f);
}
</style>
