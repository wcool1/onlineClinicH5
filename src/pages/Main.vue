<template>
    <RouterView />

    <van-tabbar v-model="active" >
        <van-tabbar-item 
        v-for="item in router.options.routes[0].children"
        :key="item.path"
        :icon="item.meta.icon"
        :url="`#/${item.path}`"
        >
            {{ item.meta.name }}
        </van-tabbar-item>
    </van-tabbar>


  

</template>

<script setup>
import {onMounted, ref,watch} from 'vue'
import { useRoute,useRouter } from 'vue-router';

const active = ref(0)
const route = useRoute()
const router = useRouter()
// 更新激活的标签页
const updateActive = () => {
    const data = router.options.routes[0].children//获取主路由的子路由
    active.value = data.findIndex(item => '/' + item.path === route.path)//获取当前路由的索引赋予active
}

// 监听路由变化
watch(() => route.path, (newPath) => {
    // 仅当路径是主路由子路径时才更新active
    if(newPath === '/home' || newPath === '/order' || newPath === '/user') {
        updateActive()
    }
})
onMounted(()=>{
    const data=router.options.routes[0].children
    // console.log(data)
    active.value=data.findIndex(item=>'/'+item.path===route.path)
    // console.log(active.value)
    updateActive()
})
</script>

