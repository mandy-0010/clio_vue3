import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const pinia = createPinia() //vue3
const app = createApp(App) //vue3

app.use(pinia)
app.use(router)
//createApp(App).use(router).mount('#app') //vue3 寫法
app.mount('#app')
