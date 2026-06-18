<template>
</template>

<script setup lang="ts">
import { AcEdOpenMode } from '@mlightcad/cad-simple-viewer'
import { MlCadViewer } from '@mlightcad/cad-viewer'
import { ref, onMounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import EmptyState from '../components/EmptyState.vue'
import FileSelector from '../components/FileSelector.vue'
import { usarStoreEcm } from '../store/ecm'
import { listarAnexos, baixarAnexo, type AnexoEcm } from '../services/ecm-api'


const openMode = AcEdOpenMode.Read
const storeEcm = usarStoreEcm()
const arquivosDwg = ref<AnexoEcm[]>([])
const arquivoVisualizador = ref<File | null>(null)
const chaveVisualizador = ref(0)
const carregando = ref(false)

onMounted(async () => {
 console.log("Iniciou")
})

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