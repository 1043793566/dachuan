import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'element-plus/dist/index.css'
import axios from "axios";
import SlideVerify from 'vue-monoplasty-slide-verify'

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:8080'

app.use(router)

app.mount('#app')

app.use(SlideVerify)

