import { createApp } from 'vue'
import App from './App.vue'
//导入router实例
import router from './router'
import api from './api'
import 'vant/lib/index.css';
//路由守卫
router.beforeEach((to,from) =>{
    const token = localStorage.getItem('h5_token')
    //非登录页面无token，跳转到登录页面
    // 添加白名单路由，比如登录页
    const whiteList = ['/login']
    
    if (!token) {
        // 没有token
        if (whiteList.includes(to.path)) {
        // 在白名单中的路由可以直接访问
        return true
        } else {
        // 其他路由重定向到登录页
        return { path: '/login' }
        }
    } else {
        if (to.path === '/login') {
        // 有token访问登录页，重定向到首页
        return { path: '/' }
        }
        return true
    }
   
})

const app = createApp(App)//创建app实例
app.config.globalProperties.$api=api//挂载接口
app.use(router)//挂载router实例
app.mount('#app')