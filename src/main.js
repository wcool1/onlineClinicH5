import { createApp } from 'vue'
import App from './App.vue'
//导入router实例
import router from './router'
import api from './api'

const app = createApp(App)//创建app实例
app.config.globalProperties.$api=api//挂载接口
app.use(router)//挂载router实例
app.mount('#app')