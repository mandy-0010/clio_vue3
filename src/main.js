import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia() // 建立一次 Pinia 實例

app.use(pinia) // 使用同一個 Pinia
app.use(router)

app.mount('#app')
