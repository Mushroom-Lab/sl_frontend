import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'//添加router
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'
import './utils/rem'
import './assets/main.css'

const app = createApp(App)
	
app.config.globalProperties.$img = function (url) {
	// return new URL(`/src/assets/img/${path}`, import.meta.url).href
	
	return new URL(`/src/assets/img/${url}`, import.meta.url).href;
}

app.use(store)
	.use(router)
	.use(ElementPlus)
	.use(createVuestic())
	.mount('#app')