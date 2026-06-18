import 'element-plus/dist/index.css'

import { i18n } from '@mlightcad/cad-viewer'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')

const loader = document.getElementById('app-loader')
if (loader) {
  loader.style.display = 'none'
}
