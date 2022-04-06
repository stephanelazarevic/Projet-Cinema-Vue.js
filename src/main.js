import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

createApp(App).use(router, VueAxios, axios).mount('#app')


require('@/assets/main.scss');
