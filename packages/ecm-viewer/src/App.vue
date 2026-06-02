<template>
  <EcmViewerPage />
</template>

<script setup lang="ts">
import EcmViewerPage from './pages/EcmViewerPage.vue'
</script>

<style>
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
