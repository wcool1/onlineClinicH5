<template>

  
</template>

<script setup>
//导入相关组件、方法
import { reactive, getCurrentInstance, ref, onMounted, computed } from 'vue';
import { useRoute,useRouter } from 'vue-router';

import { reactive, getCurrentInstance, ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//定义自带的变量
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
//自定义属性变量
const detailData=reactive({})
const second=computed( ()=>{
    return detailData.order_start_time?detailData.order_start_time+7200000-Date.now():0
})
const stateMap={
    '待支付':10,
    '待服务':20,
    '已完成':30,
    '已取消':40
}

//自定义方法
const goBack=()=>{
    router.go(-1)
}
console.log(route)
onMounted(async () => {
    const { data } = await proxy.$api.orderDetail({ oid:route.query.oid })
    Object.assign(detailData,data.data)
    
})
</script>

<style scoped lang="less">

</style>