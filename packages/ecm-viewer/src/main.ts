import 'element-plus/dist/index.css'

import { i18n } from '@mlightcad/cad-viewer'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
app.use(i18n)
app.mount('#app')

const loader = document.getElementById('app-loader')
if (loader) {
  loader.style.display = 'none'
}
