import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/10.jpg'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus';
import axios from "axios";
const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8080'

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')