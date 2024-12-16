<template>
    <div class="container">
        <div class="header">我的订单</div>
        <van-tabs @click-tab="onClickTab" v-model:active="active">
            <van-tab title="全部订单" name=""></van-tab>
            <van-tab title="待付款" name="1"></van-tab>
            <van-tab title="待服务" name="2"></van-tab>
            <van-tab title="已完成" name="3"></van-tab>
            <van-tab title="已取消" name="4"></van-tab>
        </van-tabs>
        <van-row @click="goDetail(item)" v-for="item in order" :key="item.out_trade_no">
            <van-col span="5">
                <van-image width="50" height="50" radius="5" :src=" orderImg"></van-image>
            </van-col>
            <van-col span="14">
                <div class="text1">{{item.service_name}}</div>
                <div class="text2">
                    <div>{{item.hospital_name}}</div>
                    <div>预约时间:{{ item.starttime }}</div>
                </div>
            </van-col>
            <van-col class="text2" :style="{color:colorMap[item.trade_state]}" span="5">
                {{ item.trade_state }}
                <counter :second="item.timer" v-if="item.trade_state==='待支付'"></counter>
            </van-col> 
        </van-row>
        <div class="bottom-text">没有更多了</div>
    </div>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router';
import { reactive, getCurrentInstance, ref, onMounted, computed } from 'vue';
import counter from '@/src/components/counter.vue'
import orderImg from '/order.png'  // 订单图片导入

const router = useRouter()
const route=useRoute()
//获取vue接口实例
const { proxy } = getCurrentInstance()
const order = ref([])
const active = ref('');

const colorMap={
    '待支付':'#FF6A00',
    '待服务':'#FF6A00',
    '已完成':'#999999',
    '已取消':'#999999'
}
//形参的名字即接口所需的参数名,举例传入1，请求时参数为state=1
const getOrderList=async (state)=>{
    const {data} = await proxy.$api.orderList({state})
    // console.log(data.data)
    data.data.forEach(item => {
        item.timer=item.order_start_time+7200000-Date.now()
    });
    order.value = data.data
    
}
const onClickTab = (item) => {
    getOrderList(item.name)
    
}
const goDetail=(item)=>{
    router.push(`/detail?oid=${item.out_trade_no}`)
}
onMounted(() => {
    // 从路由参数获取状态值
    const state = route.query.state || ''
    // 设置 tab 激活项
    active.value = state ? state : 0
    // 获取对应状态的订单列表
    getOrderList(state)

})
</script>

<style scoped lang="less">
.container {
    background-color: #f0f0f0;
    height: 100vh;
}

.header {
    background-color: #fff;
    line-height: 40px;
    text-align: center;
}

.van-row {
    background-color: #fff;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;

    .text1 {
        font-size: 16px;
        line-height: 25px;
        font-weight: bold;
    }

    .text2 {
        font-size: 14px;
        line-height: 20px;
        color: #999999;
    }
}

.bottom-text {
    line-height: 50px;
    text-align: center;
    color: #999999;
}
</style>